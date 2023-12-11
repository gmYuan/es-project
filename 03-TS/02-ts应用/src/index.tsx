import React from "react";
import ReactDOM from "react-dom";
import Todos from "./components/Todos";
import Counter from "./components/Counter";
import store from "@/store";
import { Provider } from "react-redux";
import { Route, Link, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <ul>
          <li>
            <Link to="/counter/counterName">counter</Link>
          </li>
          <li>
            <Link to={{ pathname: "/todos", state: { name: "todosName" } }}>
              todos
            </Link>
          </li>
        </ul>
        <Switch>
          <Route path="/counter/:name" component={Counter} />
          <Route path="/todos" component={Todos} />
        </Switch>
      </React.Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
