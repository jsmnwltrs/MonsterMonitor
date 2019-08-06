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
              <NavLink className='m-2 icon' tag={RRNavLink} to='/profile'><i className="fas fa-user-alt"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='m-2 icon' tag={RRNavLink} to='/map'><i className="fas fa-map-marked-alt"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='m-2 icon' tag={RRNavLink} to='/browse'><i className="fas fa-search"></i></NavLink>
            </NavItem>
            <NavLink className='m-2 icon' onClick={logoutClick}><i className="fas fa-sign-out-alt"></i></NavLink>
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
              className='logo'
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
