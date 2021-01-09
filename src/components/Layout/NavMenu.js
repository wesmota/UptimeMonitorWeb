import React, { Component, Fragment } from 'react';
import { Collapse, Navbar, Button, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import '../Settings/theme.css';
import { AuthConsumer } from '../Authorization/AuthProvider';


export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    toggleOpen = () =>{
        this.setState({isOpen: !this.state.isOpen});
    }

    authenticated = (auth) => (
        <Fragment>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} className="text-dark pr-5" to="/Dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark  pr-5" to="/Performance">Performance</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark  pr-5" to="/ManageEndPoints">Manage</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark pr-5" to="/Logs">Logs</NavLink>
                </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
                <NavItem >
                    <Button onClick={auth.logout}>Logout</Button>
                </NavItem>
                <NavItem>
                    <NavLink>Hello! {auth.user.name}</NavLink>
                </NavItem>
            </Nav>
        </Fragment>
    );
    notAuthenticated = () => (
        <Nav className="ml-auto" navbar>
            <NavItem className="pr-4">
                <Button tag={Link} color="secondary" outline  className="pl-3 pr-3"to="/SignIn">Login</Button>
            </NavItem>
            <NavItem >
                <Button tag={Link} color="success" to="/SignUp">Get Started</Button>
            </NavItem>
        </Nav>
    );
    render() {
        const {isOpen} = this.state;
        return (
            <header className="bgcolor">
                <Navbar light expand="sm" className="box-shadow">
                    <NavbarToggler onClick={this.toggleOpen} />
                        <AuthConsumer>
                            {(auth) => {
                                return (
                                    <Collapse isOpen={isOpen} navbar >
                                    {auth.user.isAuthenticated ? this.authenticated(auth) : this.notAuthenticated()}
                                    </Collapse>
                                );
                            }}
                        </AuthConsumer>
                </Navbar>
            </header>
        );
    }
}