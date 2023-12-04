//import { createStore } from 'redux';
/* import { createStore, Store, AnyAction } from "redux";
let reducer = (state: any) => state;
type ExtStore = Store & { age: number, home: string };
let store: ExtStore = createStore(reducer);
store.age;
store.home; */

/* interface Store{state:object}
interface Age { age:number }

type StoreExt = Store  & Age;
const createStore = <Ext>(): Store & Ext=>{
    return null;
}
let store1 = createStore();
store1.state;
let store2: StoreExt = createStore();
store2.state;
store2.age;
//let store3: StoreExt = createStore<{}>();
let store4: StoreExt = createStore<Age>(); */
interface Store {getState:()=>object}
interface Age{age:number}
type ExtStore = Store & Age;
type Ext2Store = Store & Age&{home:string};
const createStore = <Ext>():Store&Ext=>{
    return null;
}
let store1 = createStore<Age>();
store1.getState;
store1.age;
//类型推断,可以从左往右推 从右往右推 从下往上推
let store2: ExtStore = createStore<Age>();
store2.getState;
store2.age;

let store3: Ext2Store = createStore();
store3.getState;
