> 从参数actions入手，发现类型系统会将asyncAdd这样类型的函数转成() => void返回，这就导致了与Counter的asyncAdd类型对不上的类型兼容问题

actions的类型推断过程：

```tsx
// 1
InferableComponentEnhancerWithProps<
    TStateProps & ResolveThunks<actions>,
    {}
>

// 2
export type ResolveThunks<actions> =
    actions extends { [key: string]: any }
        ? {
            [C in keyof actions]: HandleThunkActionCreator<actions[C]>
        }
        : actions;

// 3
export type HandleThunkActionCreator<actions[C]> =
    actions[C] extends (...args: any[]) => any
        ? InferThunkActionCreatorType<actions[C]>
        : actions[C];

// 4
export type InferThunkActionCreatorType<actions[C]> =
    actions[C] extends (...args: infer TParams) => (...args: any[]) => infer TReturn
    ? (...args: TParams) => TReturn
    : actions[C];

// 5
(...args: TParams) => TReturn; // 根据传入的actions，ts推断TReturn是void，最终返回的类型就是(...args: TParams) => void
```

同样，connect第二次调用时，传入的Counter类型的asyncAdd属性也应该是`(...args: TParams) => void`，才不会报错。然而，Counter的asyncAdd属性的类型却是`(...args: TParams) => (dispatch: DispatchType, getState: GetStateType) => void`

所以要解决的其实是actions和Counter的类型兼容问题，解法：

```tsx
// 解法1【感觉不好，因为类组件内部调用的时候，asyncAdd函数的类型也会被改变】
// 改造Props的类型
type ReturnFunction1<T> = {
    [K in keyof T]: T[K] extends (...args: infer TParams) => infer TReturn ? TReturn extends Function ? () => void : T[K] : T[K]
}
type newProps = ReturnFunction1<Props>;
// class Counter extends React.Component<newProps> // 原来的Props --> 改成newProps

// 解法2【感觉也不好，这种强转的性质跟as any差不多了吧】
// 强转参数actions的类型
type ReturnFunction2<T> = {
    [K in keyof T]: T[K] extends (...args: infer TParams) => infer TReturn ? TReturn extends Function ? (() => () => TReturn) : T[K] : T[K]
}
export default connect(
    mapStateToProps,
    actions as ReturnFunction2<typeof actions> // 添加对actions的强转
    )(Counter);

// 解法3【感觉也不好，这种强转的性质跟as any差不多了吧】
// 强转参数Counter的类型
type ReturnFunction3<T> = {
    [K in keyof T]: T[K] extends (...args: infer TParams) => infer TReturn ? TReturn extends Function ? (() => void) | (() => TReturn) : T[K] : T[K]
}
export default connect(
    mapStateToProps,
    actions
)(Counter as ComponentType<ReturnFunction3<Props>>); // 添加对Counter的强转

// 解法4【感觉还挺完美的】
// 在源码中，connect调用第一次的返回值类型是：InferableComponentEnhancerWithProps<CounterState & ResolveThunks<actions>,{}>
// 
// 而经过ResolveThunks转化后，asyncAdd函数的类型由() => (xx: DispatchType,yy: GetStateType) => void 变成了() => void
//
// 根据返回值可以赋值给子类型的特性，可以将connect函数的返回值赋值给类型InferableComponentEnhancerWithProps<CounterState & typeof actions, {}>
//
// 这样在调用EnhancerConnect，传入Counter就不会有问题了~
let EnhancerConnect:InferableComponentEnhancerWithProps<CounterState & typeof actions, {}> = connect<CounterState, typeof actions, {}, CombinedState>(
    mapStateToProps,
    actions
)
export default EnhancerConnect(Counter); 

// 还有更优的解答吗~
```

