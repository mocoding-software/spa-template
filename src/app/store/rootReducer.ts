import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import * as Redux from "redux";
import { exampleApiReducer, ExampleApiState } from "./example";

export interface ApplicationState {
    router: RouterState;
    exampleApi: ExampleApiState;
}

export type ApplicationStateStore = Redux.Store<ApplicationState>;

export function createRootReducer(history: History): Redux.Reducer<ApplicationState> {
    return Redux.combineReducers({
        router: connectRouter(history),
        exampleApi: exampleApiReducer,
    });
}
