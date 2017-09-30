import { History } from "history";
import * as React from "react";
import { Provider } from "react-redux";
import { Route, StaticRouter } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import { ApiExamplePage, HomePage, Layout } from "./pages";
import { ApplicationStateStore } from "./store";

import "assets/styles/index.scss";

export * from "./store";

export interface ClientAppProps {
    store: ApplicationStateStore;
    history?: History;
}

export class App extends React.Component<ClientAppProps, any> {
    public render(): JSX.Element {
        return (
            <Provider store={this.props.store}>
                <ConnectedRouter history={this.props.history} >
                    <Layout>
                        <Route exact={true} path="/" component={HomePage} />
                        <Route exact={true} path="/api-example" component={ApiExamplePage} />
                    </Layout>
                </ConnectedRouter>
            </Provider>
        );
    }
}
