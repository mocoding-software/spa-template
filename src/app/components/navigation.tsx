import * as React from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import autobind from "autobind-decorator";
import { NavLink as RRNavLink } from "react-router-dom";

interface NavigationState {
  isOpen: boolean;
}

export class Navigation extends React.Component<{}, NavigationState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  public render(): JSX.Element {
    return (
      <Navbar expand="md" className="mb-4" color="faded" light>
        <NavbarToggler onClick={this.toggle} />
        <NavbarBrand href="/">spa-template</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink to="/" exact={true} activeClassName="active" tag={RRNavLink}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/api-example" activeClassName="active" tag={RRNavLink}>
                Api
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  @autobind
  private toggle(): void {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
}
