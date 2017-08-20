import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, Wrapper } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = (props) => (
  <Navbar staticTop componentClass="header" className="homeswap-nav">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Home/Swap</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse className="bs-navbar-collapse">
      <Nav pullRight role="navigation" id="top">
        {props.isLoggedIn ? <LinkContainer to='/dashboard'>
          <NavItem>Dashboard</NavItem>
        </LinkContainer> : ''}
        {!props.isLoggedIn ? <LinkContainer to='/signup'>
          <NavItem>Sign up</NavItem>
        </LinkContainer> : ''}
        <LinkContainer to={!props.isLoggedIn ? '/login' : '/'} onClick={props.onLogOut}>
          <NavItem>{props.isLoggedIn ? 'Logout' : 'Login'}</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
