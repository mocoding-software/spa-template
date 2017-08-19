import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { createBrowserHistory, History } from 'history';
import { ApplicationStateStore, ApplicationState, configureStore } from "../app/store";
import { App } from "../app";
import { ApiClient } from "../app/api";

export class Client {
    protected _rootEl: HTMLElement;
    protected _store: ApplicationStateStore;
    protected _history: History;

    constructor(elementId: string, private HmrContainer?: any, ...middleware: Redux.Middleware[]) {
        const rawState = (window as any).__STATE_CONTAINER__.state;
        const initialState = JSON.parse(rawState, ApiClient.dateTimeReviver)
        this._rootEl = document.getElementById(elementId);
        this._history = createBrowserHistory();
        this._store = configureStore(this._history, initialState, ...middleware);
    }

    run(TheApp: typeof App) {
        var Hmr = this.HmrContainer;        
        var theApp = <TheApp store={this._store} history={this._history} />;        
        ReactDOM.render(Hmr ? <Hmr>{theApp}</Hmr> : theApp, this._rootEl);        
    }
}