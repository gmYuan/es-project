import counter, { CounterState } from "./counter";
import todos, { TodosState } from "./todos";
import { connectRouter } from "connected-react-router";
import history from "@/history";

import { combineReducers } from "redux";

let reducers = {
  counter,
  todos,
  router: connectRouter(history),
};

type ReducersType = typeof reducers;
//合并后的状态类型
/* type CombinedState = {
    [K in keyof ReducersType]: ReturnType<ReducersType[K]>
} */

let combinedReducer = combineReducers(reducers);
type CombinedState = ReturnType<typeof combinedReducer>;
export { CounterState, TodosState, CombinedState };
export default combinedReducer;
