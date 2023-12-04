import React, { PropsWithChildren, ReactElement} from 'react';//@types/react
import {Todo} from '@/models';
interface Props{
    todo:Todo
}
//如何定义样式对象
const todoItemStyle:React.CSSProperties = {
    color:'red',
    backgroundColor:'green'
}
//函数组件
const TodoItem:React.FC<Props> = (props:Props)=>(
    <li style={todoItemStyle}>{props.todo.text}</li>
)
TodoItem.defaultProps={}
export default TodoItem;

/* 
type FC<P = {}> = FunctionComponent<P>;
interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    defaultProps?: Partial<P>;
}
*/
