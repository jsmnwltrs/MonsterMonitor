import React from 'react';
import userRequests from '../../helpers/data/userRequests';
import authRequests from '../../helpers/data/authRequests';
import './Home.scss';

const defaultUser = {
  username: '',
  email: '',
  imageUrl: 'http://cdn.onlinewebfonts.com/svg/img_556571.png',
  location: 'USA',
};

class Home extends React.Component {
  state = {
    user: defaultUser,
  }

  componentDidMount() {
    this.newUserSetup();
  }

  newUserSetup = () => {
    userRequests.getUserByEmail()
      .then((result) => {
        if (result === undefined) {
          const user = { ...this.state.user };
          const email = authRequests.getUserEmail();
          user.username = email;
          user.email = email;
          userRequests.addUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}

export default Home;
