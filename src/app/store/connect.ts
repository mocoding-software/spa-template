import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
import { ApplicationState } from "./rootReducer";

type MapPropsParam<TProps> = (state: ApplicationState, ownProps?: TProps) => TProps;

type MapDispatchParam<TProps, TDispatchProps> = (dispatch: Redux.Dispatch<ApplicationState>, ownProps?: TProps) => TDispatchProps;

export type ConnectedComponent<TProps> = <TComponent extends React.ComponentType<TProps>>(component: TComponent) => TComponent;

function connectToAppState<TProps, TDispatchProps = {}>(mapProps: MapPropsParam<TProps>, mapDispatch?: MapDispatchParam<TProps, TDispatchProps>): ConnectedComponent<TProps> {
    return connect<TProps, TDispatchProps, TProps>(mapProps, mapDispatch) as ConnectedComponent<TProps & TDispatchProps>;
}

export { connectToAppState as connect };
