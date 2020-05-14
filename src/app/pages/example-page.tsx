import autobind from "autobind-decorator";
import { CodeSample } from "components";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Col, Nav, NavItem, NavLink, Row } from "reactstrap";
import { connect } from "store";
import {
  ExampleApiState,
  GetServerTime,
  RefreshServerTime,
} from "store/reducers/example-reducer";

interface Props {
  apiState: ExampleApiState;
}
interface Dispatch {
  load: () => void;
  refresh: () => void;
}

type ExamplePageProps = Props & Dispatch;

@connect<Props, Dispatch>(
  (state) => ({
    apiState: state.exampleApi,
  }),
  (dispatch) => ({
    load: () => dispatch(GetServerTime()),
    refresh: () => dispatch(RefreshServerTime()),
  }),
)
export class ExamplePage extends React.Component<ExamplePageProps> {
  constructor(props: ExamplePageProps) {
    super(props);

    props.load();
  }

  public render(): JSX.Element {
    const { apiState } = this.props;

    const apiOutput =
      !apiState.isProcessing && apiState.result ? (
        <p>
          {apiState.result.message}
          <br />
          {apiState.result.currentServerTime?.utcOffset(0).format("HH:mm:ss a")}
        </p>
      ) : (
        "loading..."
      );

    return (
      <div>
        <Helmet>
          <title>Spa-Template - Api Example Page</title>
        </Helmet>
        <div className="mb-4">
          <Nav pills={true}>
            <NavItem>
              <NavLink href="#" onClick={this.onRefresh}>
                Refresh
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <Row>
          <Col sm={3}>
            <h4>Output</h4>
            <samp>{apiOutput}</samp>
          </Col>
          <Col sm={9}>
            <h4>Redux Automata</h4>
            <CodeSample />
          </Col>
        </Row>
      </div>
    );
  }

  @autobind
  private onRefresh(e: React.SyntheticEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    this.props.refresh();
  }
}
