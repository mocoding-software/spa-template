import { Navigation } from "components";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Col, Container, Row } from "reactstrap";

export class Layout extends React.Component {
  public render(): JSX.Element {
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
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
