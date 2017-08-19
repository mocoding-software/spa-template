import * as React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem } from "reactstrap";
const { NavLink } = require("reactstrap");
import { NavLink as RRNavLink, Link } from 'react-router-dom'

interface NavigationProps {
}

interface NavigationState {
    isOpen: boolean;
}

export class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor() {
        super();

        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar toggleable className="mb-4 bg-inverse" inverse>
                <NavbarToggler right onClick={this.toggle.bind(this)} />
                <NavbarBrand href="/">spa-template</NavbarBrand>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar >
                        <NavItem>                            
                            <NavLink to="/" exact activeClassName="active" tag={RRNavLink}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/api-example" activeClassName="active" tag={RRNavLink}>Api</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}


