import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import * as Redux from "redux";
import { automataMiddleware } from "redux-automata";
import * as RootModule from "./rootReducer";

export * from "./rootReducer";

export function configureStore(history: History, initialState?: RootModule.ApplicationState, ...middlewares: Redux.Middleware[]): RootModule.ApplicationStateStore {

    const pipeline = Redux.applyMiddleware(
        routerMiddleware(history),
        automataMiddleware,
        // apply additional middleware here for custom store enchancements
        ...middlewares,
    );

    const store = Redux.createStore(RootModule.createRootReducer(history), initialState, Redux.compose(pipeline));

    if (module.hot)
        module.hot.accept("./rootReducer", () => {
            const { createRootReducer } = require<typeof RootModule>("./rootReducer");
            store.replaceReducer(createRootReducer(history));
        });

    return store;
}
