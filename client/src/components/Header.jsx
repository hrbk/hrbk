import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, Wrapper } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  /**
   * The header component includes a home, dashboard, sign up and login buttons. The dashboard, sign up and login buttons will collapse on browser window resize into a menu bar.
   */
  <Navbar staticTop componentClass="header" className="homeswap-nav">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Home/Swap</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse className="bs-navbar-collapse">
      <Nav pullRight role="navigation" id="top">
        <LinkContainer to='/dashboard'>
          <NavItem>Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to='/signup'>
          <NavItem>Sign up</NavItem>
        </LinkContainer>
        <LinkContainer to='/login'>
          <NavItem>Login</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
