

/* function New(){

} */
class New{

}

let newObject: New = new New();
let K:typeof New = New;



function sum<T,U>(a:T,b:U):U{
 return b;
}
let r = sum(1,2);
let r2 = sum('a', 'b');
