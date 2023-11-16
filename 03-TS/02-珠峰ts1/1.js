var married = true;
var age = 10;
var first_name = "zf";
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
//元组类型tuple 数量和类型已知的数组
var zhufeng = ["zhufeng", 10];
//普通枚举
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
console.log(Gender["BOY"], Gender[1]);
console.log(Gender["GIRL"], Gender[0]);
var myColor = [0 /* Colors.RED */, 1 /* Colors.YELLOW */, 2 /* Colors.BLUE */];
//任意类型
//any
//如果变量定义为any类型,就跟JS差不多,不进行类型检查
/* let root:any = document.getElementById('root');
root.style.color ='red';

let element: (HTMLElement | null) = document.getElementById('root');
//非空断言
element!.style.color = 'green';
 */
/// null undefined 是其它类型的子类型
// 如果说strictNullChecks的值为true,则不能把null undefined赋值给x
var x;
x = 1;
/* x=undefined;
x=null; */
var z = undefined;
var z2 = undefined;
var z3 = null;
var z4 = null;
var y;
y = 1;
y = undefined;
y = null;
//never 代表不会出现的值
//1.作为不会返回的函数的返回值 类型
function error(message) {
    throw new Error("报错了"); //直接异常结束 了
    console.log("ok");
}
function loop() {
    while (true) { }
    console.log("ok");
}
function fn(x) {
    if (typeof x === "number") {
        console.log(x);
    }
    else if (typeof x === "string") {
        console.log(x);
    }
    else {
        console.log(x); //never
    }
}
//void 代表没有任何类型
//函数没有返回值,那么就是void类型
//strictNullChecks=false null 赋值 void true,不行了
function greeting() {
    //return null;
}
//void never
//void可又被赋值为null undefined never不能包含任何类型
//返回类型为void的函数能还执行,但是返回never的函数无法正常执行
//Symbol
var s1 = Symbol("key");
var s2 = Symbol("key");
//console.log(s1 == s2);
//es next
//BigInt
//const max = Number.MAX_SAFE_INTEGER;//2**53-1
//console.log(max+1 ===max+2);
var max = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max + BigInt(1) === max + BigInt(2));
//console.log(max + 1n === max + 2n);
//JS里的类型Number BigInt  ts里的类型 number bigint
var foo;
var bar;
/* foo = bar;
bar =foo;
 */
var isOk1 = true;
var isOk2 = Boolean(1);
//let isOk3: boolean = new Boolean(1);
//联合类型
var name3;
console.log(name3.toString());
name3 = 3;
console.log(name3.toFixed(2));
name3 = "zhufeng";
console.log(name3.length);
//类型断言
var name4;
console.log(name4.toFixed(2));
console.log(name4.length);
//双重断言
console.log(name4);
//字面量类型和类型字面量
var up = "Up";
var down = "Down";
var left = "Left";
var right = "Right";
//可实现枚举的效果
function move(direction) { }
move("Down");
var p1 = {
    name: "zhufeng",
    age: 10,
};
var t1 = "1";
var t2 = true;
