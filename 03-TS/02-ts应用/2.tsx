import React from "react";
//import hoistNonReactStatics from "hoist-non-react-statics";
const REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true,
};

function hoistNonReactStatics<
  N extends React.ComponentClass<any>,
  O extends React.ComponentClass<any>
>(NewComponent: N, OldComponent: O): N & O {
  let keys = Object.getOwnPropertyNames(OldComponent); //['age1','defaultProps','propTypes']
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!REACT_STATICS[key]) {
      const descriptor = Object.getOwnPropertyDescriptor(OldComponent, key);
      Object.defineProperty(NewComponent, key, descriptor);
    }
  }
  return NewComponent as N & O;
}

interface Props {}
interface State {}

class OldComponent extends React.Component<Props, State> {
  static age1: number = 10;
}

class NewComponent extends React.Component<Props, State> {
  static age2: number = 20;
}

let N = hoistNonReactStatics<typeof NewComponent, typeof OldComponent>(
  NewComponent,
  OldComponent
);
//完全不一样 NewComponent 代表NewComponent实例的类型
N.age1;
N.age2;
