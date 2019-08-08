import React from 'react';
import {
  Button,
  Container,
} from 'reactstrap';
import authRequests from '../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
    loginClickEvent = (e) => {
      e.preventDefault();
      authRequests
        .loginUser()
        .then(() => {
          this.props.history.push('/home');
        })
        .catch((error) => {
          console.error('login not successful', error);
        });
    };

    render() {
      return (
        <Container className="login-container">
          <div className='d-flex justify-content-center'>
            <img className='app-logo m-2' src='https://firebasestorage.googleapis.com/v0/b/monster-monitor-5c7dc.appspot.com/o/mouth.png?alt=media&token=4a1af8d9-12cd-4ebb-944e-0a617a7c9dcd' alt='logo'/>
          </div>
          <div className='d-flex justify-content-center m-3'>
            <h1 className='app-title'>Monster Monitor</h1>
          </div>
          <div className='d-flex justify-content-center m-3'>
            <Button
              type="submit"
              className="btn login-button m-4"
              onClick={this.loginClickEvent}
              color='secondary'
            >
            <img
              className='google-logo mr-2'
              src='https://yokoent.com/images/google-logo-png-circle-15.png'
              alt='google-logo'
            />
            Login with Google
            </Button>
          </div>
        </Container>
      );
    }
}

export default Auth;
