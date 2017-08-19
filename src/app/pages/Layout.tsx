import * as React from 'react';
import { Helmet } from "react-helmet";
import { Navigation } from "components";
import { Container, Row, Col } from "reactstrap";

export interface LayoutProps {
}

export class Layout extends React.Component<LayoutProps, any> {
    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Spa-Template</title>
                </Helmet>
                <Row>
                    <Col>
                        <Navigation />
                    </Col>
                </Row>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}