import * as React from 'react';
import { Provider } from 'react-redux';
import { History } from 'history';
import { ConnectedRouter } from "react-router-redux";
import { Route, StaticRouter } from "react-router-dom";

import { ApplicationStateStore } from './store';
import { Layout, HomePage, ApiExamplePage } from "./pages";

import "assets/styles/index.scss";

export * from "./store";

export interface ClientAppProps {
    store: ApplicationStateStore;
    history?: History;
}

export class App extends React.Component<ClientAppProps, any> {
    render() {
        return (
            <Provider store={this.props.store}>
                <ConnectedRouter history={this.props.history} >
                    <Layout>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/api-example' component={ApiExamplePage} />
                    </Layout>
                </ConnectedRouter>
            </Provider>
        );
    }
}


