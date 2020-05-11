import { RouterState } from "connected-react-router";
import * as Redux from "redux";
import { automataMiddleware } from "redux-automata";
import { exampleApiReducer, ExampleApiState } from "./reducers/example-reducer";

export interface ApplicationState {
  router: RouterState;
  exampleApi: ExampleApiState;
}

const reducers: Redux.ReducersMapObject<Omit<ApplicationState, "router">> = {
  exampleApi: exampleApiReducer,
};

const middlewares: Redux.Middleware[] = [automataMiddleware];

export { middlewares, reducers };
