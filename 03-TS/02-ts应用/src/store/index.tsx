import {
  createStore,
  applyMiddleware,
  AnyAction,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  Store,
} from "redux";
import combinedReducer, { CombinedState } from "./reducers";
//import {routerMiddleware} from 'connected-react-router';
import thunk, { ThunkDispatch, ThunkAction } from "redux-thunk";
import history from "@/history";
/**
export function applyMiddleware<Ext1, Ext2, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 }>
 */
/**
 * 中间件是用来扩展dispatch方法的 原来中间件只能派发普通对象,现在可以添加函数 promise
 * Ext1 thunk中间件能给dispatch方法增加哪些签名 哪些重载 Ext Dispatch signature added by a middleware.
 * Ext2
 * S
 */
export type DispatchType = ThunkDispatch<CombinedState, undefined, AnyAction>;
type Ext = {
  dispatch: DispatchType;
};
export type GetStateType = () => CombinedState;
interface StateExt {}
//storeEnhancer 是一个createStore方法的增强器
let storeEnhancer: StoreEnhancer<Ext> = applyMiddleware<
  DispatchType,
  CombinedState
>(thunk);
let storeEnhancerStoreCreator: StoreEnhancerStoreCreator<Ext, StateExt> =
  storeEnhancer(createStore);


// 创建store实例
let store: Store<CombinedState, AnyAction> & Ext = storeEnhancerStoreCreator<
  CombinedState,
  AnyAction
>(combinedReducer);



let thunkAction: ThunkAction<void, CombinedState, undefined, AnyAction> = (
  dispatch: DispatchType,
  getState: GetStateType
): void => {};
store.dispatch(thunkAction);

//合并 combineReducer 经过了合并?

//(createStore)(combinedReducer);
export default store;

/**
export interface ThunkDispatch<S, E, A extends Action> {
  <T extends A>(action: T): T;
  <R>(asyncAction: ThunkAction<R, S, E, A>): R;
}

export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R;
 */
