import React from 'react';
import userRequests from '../../helpers/data/userRequests';
import authRequests from '../../helpers/data/authRequests';
import './Home.scss';

import MostPopular from '../MostPopular/MostPopular';
import MostRecent from '../MostRecent/MostRecent';

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
        <img className='tree-image'
        src='https://firebasestorage.googleapis.com/v0/b/monster-monitor-5c7dc.appspot.com/o/tree.png?alt=media&token=9c979c17-3c43-4f20-8bd2-10e44c30ebe8'
        alt='tree'/>
        <MostPopular history={this.props.history}/>
        <MostRecent history={this.props.history}/>
      </div>
    );
  }
}

export default Home;
