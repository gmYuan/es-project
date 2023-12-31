import React, { ReactNode } from 'react';
import { Todo } from '@/models';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { CombinedState, TodosState } from '@/store/reducers';
import * as actions from '@/store/actions/todos';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
interface Params { }
interface State {}
export interface TodosLocationState { name:string}
type Props = TodosState & typeof actions & RouteComponentProps<Params, StaticContext, TodosLocationState>;;
class Todos extends React.Component<Props, State>{
    render(){
        let {list,addTodo,location} = this.props;
        return (
            <div>
                <p>name:{location.state.name}</p>
                <TodoInput addTodo={addTodo}/>
                <ul style={{width:100}}>
                    {
                        list.map((todo:Todo)=>(
                            <TodoItem todo={todo} key={todo.id}/>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state: CombinedState): TodosState => state.todos
export default connect(
    mapStateToProps,
    actions
)(Todos);