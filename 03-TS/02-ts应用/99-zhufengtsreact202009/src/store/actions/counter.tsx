import { ADD, MINUS } from '@/action-types';
import { LocationDescriptorObject } from 'history';
import { TodosLocationState } from '@/components/Todos';
import { push, CallHistoryMethodAction } from 'connected-react-router';
import { DispatchType, GetStateType} from '@/store';
export function add(){
    return {type:ADD};
}
export function asyncAdd() {
   return function (dispatch: DispatchType, getState: GetStateType):void{
        setTimeout(()=>{
            dispatch({ type: ADD });
        },1000);
    }
}
export function minus() {
    return {type:MINUS};
}
export function go(location: LocationDescriptorObject<TodosLocationState>):
 CallHistoryMethodAction<[LocationDescriptorObject<TodosLocationState>]>{
    return push<TodosLocationState>(location);
}

export type CounterAction = ReturnType<typeof add> | ReturnType<typeof minus>