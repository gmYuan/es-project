import React, { ReactNode } from "react";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { CombinedState, CounterState } from "@/store/reducers";
import * as actions from "@/store/actions/counter";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { LocationDescriptorObject } from "history";
import { TodosLocationState } from "./Todos";
interface Params {
  name: string;
}
type Props = CounterState &
  typeof actions &
  RouteComponentProps<Params, StaticContext>;
class Counter extends React.Component<Props> {
  render() {
    const {
      count,
      add,
      asyncAdd,
      minus,
      match: { params },
      go,
    } = this.props;
    const path: LocationDescriptorObject<TodosLocationState> = {
      pathname: "/todos",
      state: { name: "todosName" },
    };
    return (
      <div>
        <p>name:{params.name}</p>
        <p>{count}</p>
        <button onClick={add}>+</button>
        <button onClick={asyncAdd}>异步加1</button>
        <button onClick={minus}>-</button>
        <button onClick={() => go(path)}>/todos</button>
      </div>
    );
  }
}
const mapStateToProps = (state: CombinedState): CounterState => state.counter;
let EnhancerConnect: InferableComponentEnhancerWithProps<
  CounterState & typeof actions,
  {}
> = connect<CounterState, typeof actions, {}, CombinedState>(
  mapStateToProps,
  actions
);
export default EnhancerConnect(Counter);

// Type 'void' is not assignable to type '(dispatch: any, getState: any) => void'


/*
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
type PropsWithChildren<Props> = Readonly<Props> & Readonly<{
    children?: ReactNode  字符串  null React元素 
}>
type ComponentProps = PropsWithChildren<Props>; */
