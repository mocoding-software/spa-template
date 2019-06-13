import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";

import { HomePage, Layout } from "./pages";
import { ApplicationStateStore } from "./store";

import "assets/styles/index.scss";

export * from "./store";

// @ts-ignore
import Loadable from "react-loadable";

function Loading() {
  return <div>Loading...</div>;
}

const ApiExamplePage = Loadable({
  loader: () => System.import(/* webpackChunkName="page" */"./pages/ApiExamplePage"),
  loading: Loading,
});

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
