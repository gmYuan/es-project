export {};

// 这个接口描述的是一个函数定义，age是函数上的1个静态属性
interface Type1 {
  (name: string): any;
  age: number;
}

// 这个接口描述的是一个对象定义，对象内有一个a属性，其值是1个函数
interface Type2 {
  a: (name: string) => any;
}

let t: any = (name: string) => {};
t.age = 10;
let t1: Type1 = t;

let t2: Type2 = {
  a: t1,
};
