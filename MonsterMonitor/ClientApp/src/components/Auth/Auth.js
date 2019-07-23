import React from 'react';
import {
  Button,
  Container,
} from 'reactstrap';
import authRequests from '../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {

    loginClickEvent = (e) => {
      const { user } = this.state;
      e.preventDefault();
      authRequests
        .loginUser(user)
        .then(() => {
          this.props.history.push('/home');
        })
        .catch((error) => {
          console.error('user did not login', error);
        });
    };

    render() {
      return (
            <Container className="Login">
                    <div className="">
                        <Button
                        type="submit"
                        className="btn col-xs-12 mr-2"
                        onClick={this.loginClickEvent}
                        color="primary"
                        >
                        Login
                        </Button>
                    </div>
            </Container>
      );
    }
}

export default Auth;
