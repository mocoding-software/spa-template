import * as React from 'react';

import { IExampleApiState, GetServerTime, RefreshServerTime } from 'store/example';
import { ApiClient, ExampleDto } from 'api';
import { connect } from "store";
import { Helmet } from "react-helmet";
import { Row, Col, Nav, NavLink, NavItem } from "reactstrap";
import { CodeSample } from "components";


export interface ApiExamplePageProps {
    apiState: IExampleApiState
}

export interface ApiExamplePageDispatch {
    load: () => void;
    refresh: () => void;
}

@connect<ApiExamplePageProps, ApiExamplePageDispatch>(
    state => ({
        apiState: state.exampleApi
    }),
    dispatch => ({
        load: () => dispatch(GetServerTime),
        refresh: () => dispatch(RefreshServerTime),
    })
)
export class ApiExamplePage extends React.Component<ApiExamplePageProps & ApiExamplePageDispatch> {
    componentWillMount() {
        this.props.load();
    }

    onRefresh(e: React.SyntheticEvent<HTMLAnchorElement>)
    {
        e.preventDefault();
        this.props.refresh();
    }

    render() {
        const {
            apiState
        } = this.props;
        return (
            <div>
                <Helmet>
                    <title>Spa-Template - Api Example Page</title>
                </Helmet>
                <div className="mb-4">                    
                    <Nav pills>
                        <NavItem>
                            <NavLink href="#" onClick={this.onRefresh.bind(this)}>Refresh</NavLink>
                        </NavItem>
                    </Nav>                    
                </div>
                <Row>
                    <Col sm={3}>
                        <h4>Output</h4>
                        <samp>
                            {!apiState.isFetching && apiState.data
                                ? <p>{apiState.data.message}<br />{apiState.data.currentServerTime.format("HH:mm a")}</p>
                                : "loading..."}
                        </samp>
                    </Col>

                    <Col sm={9}>
                       <h4>Redux Automata</h4>
                       <CodeSample />                       
                    </Col>
                </Row>
            </div>
        );
    }
}