import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClick: PropTypes.func,
  }

  render() {
    const { isAuthed, logoutClick } = this.props;

    const buildLinks = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/profile'>Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/map'>Map</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/browse'>Browse</NavLink>
            </NavItem>
            <NavLink className='logout-link' onClick={logoutClick}>Logout</NavLink>
          </Nav>
        );
      }
      return <div></div>;
    };

    return (
      <div className="my-navbar sticky-top">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Monster Monitor</NavbarBrand>
            {buildLinks()}
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
