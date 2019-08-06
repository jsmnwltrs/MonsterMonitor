import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Navbar,
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

    if (!isAuthed) {
      return <div></div>;
    }

    return (
      <div className="my-navbar sticky-top">
        <Navbar color="dark" dark expand="md">
          <NavLink tag={RRNavLink} to='/home'>
            <img
              width='75px'
              height='50px'
              src="https://cdn140.picsart.com/300890030463211.png?r640x640"
              alt='logo'
            />
          </NavLink>
          {buildLinks()}
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
