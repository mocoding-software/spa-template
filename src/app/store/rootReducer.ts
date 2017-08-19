import * as Redux from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { IExampleApiState, exampleApiReducer } from './example';

export interface ApplicationState {
    routing: RouterState
    exampleApi: IExampleApiState
}

export type ApplicationStateStore = Redux.Store<ApplicationState>;

export const rootReducer: Redux.Reducer<ApplicationState> = Redux.combineReducers<ApplicationState>({  
    routing: routerReducer,
    exampleApi: exampleApiReducer
});