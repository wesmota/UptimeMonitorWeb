import React, { Component, Fragment } from 'react';
import { Collapse, Container, Navbar, Button, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { AuthConsumer } from './Authorization/AuthProvider';
import { ToastContainer } from 'react-toastify';


export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    authenticated = (auth) => (
        <Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/ManageEndPoints">Manage</NavLink>
            </NavItem>
            <NavItem>
                <Button onClick={auth.logout}>Logout</Button>
            </NavItem>
            <NavItem>
                <NavLink className="ml-2">Hello! {auth.user.name}</NavLink>
            </NavItem>
        </Fragment>
    );
    notAuthenticated = () => (
        <Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/SignIn">Login</NavLink>
            </NavItem>
            <NavItem>
                <Button tag={Link} className="btn-success" to="/SignUp">Get Started</Button>
            </NavItem>
        </Fragment>
    );
    render() {
        return (
            <header>
                     <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-white border-bottom box-shadow" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Uptime Monitor</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <AuthConsumer>
                                    {(auth) => {
                                        return (
                                            <Fragment>
                                                {auth.user.isAuthenticated ? this.authenticated(auth) : this.notAuthenticated()}
                                            </Fragment>
                                        );
                                    }}
                                </AuthConsumer>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
