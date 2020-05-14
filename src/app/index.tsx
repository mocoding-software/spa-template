import * as React from "react";
import { Route } from "react-router-dom";
import { ExamplePage, HomePage, Layout } from "./pages";

import "./index.scss";

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Layout>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/api-example" component={ExamplePage} />
      </Layout>
    );
  }
}
