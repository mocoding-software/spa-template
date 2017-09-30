import * as React from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";
const { NavLink } = require("reactstrap");
import autobind from "autobind-decorator";
import { Link, NavLink as RRNavLink } from "react-router-dom";

interface INavigationState {
    isOpen: boolean;
}

export class Navigation extends React.Component<{}, INavigationState> {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        };
    }

    public render(): JSX.Element {
        return (
            <Navbar toggleable className="mb-4"  color="faded" light>
                <NavbarToggler right onClick={this.toggle} />
                <NavbarBrand href="/">spa-template</NavbarBrand>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar >
                        <NavItem>
                            <NavLink to="/" exact={true} activeClassName="active" tag={RRNavLink}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/api-example" activeClassName="active" tag={RRNavLink}>Api</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

    @autobind
    private toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
}
