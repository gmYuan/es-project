import React, { ComponentType} from 'react';
type Fn1 = ()=>()=>void
type Fn2 = ()=>void;

interface Props{
    fn: Fn1
}
type C1 = ComponentType<Props>;

interface Props2 {
    fn: Fn2
}
type C2 = ComponentType<Props2>;

let c1:C1;
let c2:C2;
c2=c1;

//子类型的值可以赋值给父类型的变量
type T2 = () => void;
// 下面赋值没问题，为啥呢？
const foo: T2 = function ():string { return 'aaa'; };
const out = foo();
//out.length; // 这里会报错，因为 out 是 void 类型的，而不是string