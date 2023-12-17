import { ADD_TODO } from "@/action-types";
import { Todo } from "@/models";
import { TodosAction } from "@/store/actions/todos";

export interface TodosState {
  list: Array<Todo>;
}
let initialState: TodosState = { list: new Array<Todo>() };

export default function (
  state: TodosState = initialState,
  action: TodosAction
): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return { list: [...state.list, action.payload] }; //action.payload放着新的Todo
    default:
      return state;
  }
}
