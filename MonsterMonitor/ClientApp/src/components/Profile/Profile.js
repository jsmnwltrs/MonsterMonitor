import React from 'react';
import { Label } from 'reactstrap';
import './Profile.scss';
import userRequests from '../../helpers/data/userRequests';
import ProfileModal from '../ProfileModal/ProfileModal';
import SightingTable from '../SightingTable/SightingTable';

const defaultUser = {
  id: 0,
  username: '',
  email: '',
  imageUrl: '',
  location: '',
};

class Profile extends React.Component {
  state = {
    user: defaultUser,
  }

  componentDidMount() {
    this.setUserState();
  }

  setUserState = () => {
    userRequests.getUserByEmail()
      .then((user) => {
        this.setState({ user });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSubmit = (userObject) => {
    userRequests.updateUser(userObject)
      .then(() => {
        this.setUserState();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { user } = this.state;

    if (user.id === 0) {
      return (
      <div></div>
      );
    }

    return (
      <div>
        <h1>Profile Page</h1>
        <ProfileModal user={user} onSubmit={this.onSubmit}/>
        <div className='profile-container'>
          <img className='profile-avatar' src={user.imageUrl} alt='profile-avatar'></img>
          <Label>Username: </Label>
          <p>{user.username}</p>
          <Label>Location: </Label>
          <p>{user.location}</p>
        </div>
        <div className='sighting-container'>
          <SightingTable userId={user.id} history={this.props.history}/>
        </div>
      </div>
    );
  }
}

export default Profile;
