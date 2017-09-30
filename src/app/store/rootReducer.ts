import { routerReducer, RouterState } from "react-router-redux";
import * as Redux from "redux";

import { exampleApiReducer, ExampleApiState } from "./example";

export interface ApplicationState {
    routing: RouterState;
    exampleApi: ExampleApiState;
}

export type ApplicationStateStore = Redux.Store<ApplicationState>;

export const rootReducer: Redux.Reducer<ApplicationState> = Redux.combineReducers<ApplicationState>({
    routing: routerReducer,
    exampleApi: exampleApiReducer,
});
