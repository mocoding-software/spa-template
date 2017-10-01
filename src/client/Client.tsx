import { createBrowserHistory, History } from "history";
import * as React from "react";
// tslint:disable-next-line:no-var-requires
const ReactDOM = require("react-dom");
import * as Redux from "redux";
import { App } from "../app";
import { ApiClient } from "../app/api";
import { ApplicationState, ApplicationStateStore, configureStore } from "../app/store";

import { AppInsights } from "applicationinsights-js";

export class Client {
    protected rootEl: HTMLElement;
    protected store: ApplicationStateStore;
    protected history: History;

    constructor(elementId: string, private HmrContainer?: any, ...middleware: Redux.Middleware[]) {
        const { state, instrumentationKey } = (window as any).__STATE_CONTAINER__;
        const initialState = JSON.parse(state, ApiClient.dateTimeReviver);
        this.rootEl = document.getElementById(elementId);
        this.history = createBrowserHistory();
        this.store = configureStore(this.history, initialState, ...middleware);

        AppInsights.downloadAndSetup({ instrumentationKey });
        AppInsights.trackPageView();
        // this._history.listen(ev => AppInsights.trackPageView()); for multiple pages
    }

    public run(TheApp: typeof App) {
        const Hmr = this.HmrContainer;
        const theApp = <TheApp store={this.store} history={this.history} />;
        ReactDOM.hydrate(Hmr ? <Hmr>{theApp}</Hmr> : theApp, this.rootEl);
    }
}
