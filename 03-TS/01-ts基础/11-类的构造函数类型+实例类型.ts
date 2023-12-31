//React也非常重要的一个知识点
export {};

/**
 * 当我们写一个类的时候,会得到2个类型
 * 1. 构造函数类型的函数类型
 * 2. 类的实例类型
 */

class Component {
  static myName: string = "静态名称属性";
  myName: string = "实例名称属性";
}
let com = Component;

//Component类名本身 表示的是实例的类型
//ts 一个叫类型 一个叫值
//冒号后面的是类型； 放在=后面的 是值
let c: Component = new Component();
let f: typeof Component = com;


namespace b {
  function Component() {
    this.myName = "实例名称属性";
  }
  let com = Component;
  Component.myName = "静态名称属性";
  //let c: Component = new Component();
  let f: typeof Component = com;
}
