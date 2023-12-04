/**
 * 装饰
 */
export {};



/* class Person{
    say(){}
} */
/* function Person(){}
Object.defineProperty(Person.prototype,'say',{
    value:function say(){}
}); */
//类装饰器
//类装饰器工厂

namespace a {
  function addNameEat(x: Function) {
    x.prototype.name = "zhufeng";
    x.prototype.eat = function () {};
  }

  @addNameEat
  class Person {
    name: string;
    eat: Function;
    constructor() {}
  }
  // let p: Person = new Person();
  // console.log('ppp', p.name);
  // p.eat();
}


namespace b {
  function addNameEatFactory(name: string) {
    return function addNameEat(x: Function) {
      x.prototype.name = name;
      x.prototype.eat = function () {};
    };
  }
  @addNameEatFactory("jiagou")
  class Person {
    name: string;
    eat: Function;
    constructor() {}
  }
  // let p: Person = new Person();
  // console.log(p.name);
  // p.eat();
}


//可以多,但不能少
///类型安全
namespace c {
  function replaceClass(constructor: Function) {
    return class {
      name: string;
      eat: Function;
      age: number;
      constructor() {}
    };
  }
  @replaceClass
  class Person {
    name: string;
    eat: Function;
    constructor() {}
  }
  // let p: Person = new Person();
  // console.log('ccc', p.name);
}


//属性装饰器
//装饰属性
//装饰方法
namespace d {
  //如果装饰的是实例属性的话,target是构造函数的原型
  function upperCase(target: any, propertyKey: string) {
    let value = target[propertyKey];
    const getter = () => value;
    const setter = (newVal: string) => {
      value = newVal.toUpperCase();
    };
    if (delete target[propertyKey]) {
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    }
  }
  //如果装饰的是静态属性的话,target是构造函数本身
  function staticPropertyDecorator(target: any, propertyKey: string) {
    // console.log('静态属性的target和key', target, propertyKey);
  }
  // 修饰实例方法
  function noEnumerable(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // console.log('实例方法的target',target);
    // console.log('实例方法的key',propertyKey);
    descriptor.enumerable = false;
  }
  function toNumber(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let oldMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      args = args.map((item) => parseFloat(item));
      return oldMethod.apply(this, args);
    };
  }
  class Person {
    @upperCase
    name: string = "zhufeng"; //实例属性
    @staticPropertyDecorator
    static age: number = 10; //静态属性
    @noEnumerable
    getName() {
      console.log(this.name);
    } //实例方法
    @toNumber
    sum(...args: any[]) {
      //实例方法
      return args.reduce((accu: number, item: number) => accu + item, 0);
    }
  }
  // let p = new Person();
  // console.log('----------', p.name);
  // console.log(p.sum('1', '2', '3'));
}


//参数装饰器
namespace e {
  //手写一个IOC
  //在IOC容器里大放异彩  Nest.js大量的用到了参数装饰器
  //target 静态成员就是构造函数 非静态成员就是构造函数原型 方法的名称 参数的索引
  function addAge(target: any, methodName: any, paramIndex: number) {
    // console.log('参数装饰器的target,methodName,index是--', target, methodName, paramIndex);
    target.age = 10;
  }
  class Person {
    age: number;
    login(username: string, @addAge password: string) {
      // console.log(this.age, username, password);
    }
  }

  // let p = new Person();
  // p.login("1", "2");
}


//装饰器的执行顺序
namespace f {
  function ClassDecorator1() {
    return function (target: any) {
      console.log("ClassDecorator1");
    };
  }
  function ClassDecorator2() {
    return function (target: any) {
      console.log("ClassDecorator2");
    };
  }
  function PropertyDecorator(name: string) {
    return function (target: any, propertyName: any) {
      console.log("PropertyDecorator", propertyName, name);
    };
  }
  function MethodDecorator() {
    return function (target: any, propertyName: any) {
      console.log("MethodDecorator", propertyName);
    };
  }
  function ParameterDecorator() {
    return function (target: any, methodName: any, index: number) {
      console.log("ParameterDecorator", methodName, index);
    };
  }
  @ClassDecorator1()
  @ClassDecorator2()
  class Person {
    @PropertyDecorator("name")
    name: string = "";
    @PropertyDecorator("age")
    age: number = 10;
    @MethodDecorator()
    hello(@ParameterDecorator() p1: string, @ParameterDecorator() p2: string) {}
  }
}

/**
 * 执行顺序的规律
 * 1. 类装饰器是最后执行的, 后写的类装饰器先执行
 * 2. 方法和【方法参数】中的装饰器，先执行【方法参数】装饰器
 * 3. 方法和属性装饰器, 谁在前面先执行谁
 *
 * 一般都是 从内往外执行 先内后外
 * 类比React组件的componentDidMount 先上后下 先内后外
 * 
 * 一定要学会知识的嫁接
 * koa 中间件 redux中间件
 */
