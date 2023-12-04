import React from 'react';
import  hoistNonReactStatics from 'hoist-non-react-statics';
let defaultProps = {
    settings: {
        maxLength: 6,
        placeholder: '请输入待办事项'
    }
}
export type DefaultProps = typeof defaultProps;

export const withDefaultProps = <P extends DefaultProps>(
    OldComponent:React.ComponentType<P>)=>{
    type OwnProps = Omit<P,keyof DefaultProps>
    class NewComponent extends React.Component<OwnProps>{
        render(){
            let props = {...defaultProps,...this.props} as P;
            return <OldComponent {...props}/>
        }
    }
    //return NewComponent;
    return hoistNonReactStatics(NewComponent,OldComponent);
}

//type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;