import { ApplicationState } from "./rootReducer";

import * as React from "react";
import {
    connect as originalConnect, MapDispatchToPropsParam, MapStateToPropsParam, MergeProps, Options
} from "react-redux";

export type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <TComponent extends React.ComponentType<TInjectedProps & TNeedsProps>>(component: TComponent) => TComponent;

interface MyConnect {
    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
        mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, ApplicationState>,
        mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
        mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, ApplicationState>,
        mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
        mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
        options?: Options<TStateProps, TOwnProps, TMergedProps>
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

}

export const connect = originalConnect as MyConnect;
