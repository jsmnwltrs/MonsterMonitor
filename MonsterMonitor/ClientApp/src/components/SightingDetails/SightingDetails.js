import React from 'react';
import './SightingDetails.scss';
import sightingRequests from '../../helpers/data/sightingRequests';
import userRequests from '../../helpers/data/userRequests';
import UserLike from '../UserLike/UserLike';
import Comments from '../Comments/Comments';

const defaultSighting = {
  id: 0,
  userId: 0,
  title: '',
  location: '',
  description: '',
  imageUrl: '',
  videoUrl: '',
  dateCreated: '',
  threatLevel: '',
  isActive: false,
  isAnon: false,
  latitude: 0,
  longitude: 0,
};

const defaultUser = {
  id: 0,
  username: '',
  email: '',
  imageUrl: '',
  location: '',
};

class SightingDetails extends React.Component {
  state = {
    sighting: defaultSighting,
    user: defaultUser,
  }

  componentDidMount() {
    this.setSighting();
    this.setUser();
  }

  setSighting = () => {
    const sightingId = this.props.match.params.id;
    sightingRequests.getSightingById(sightingId)
      .then((result) => {
        const sighting = result.data;
        this.setState({ sighting });
      }).catch((error) => {
        console.error(error);
      });
  }

  setUser = () => {
    userRequests.getUserByEmail()
      .then((user) => {
        this.setState({ user });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { sighting, user } = this.state;

    return (
      <div>
        Sighting Details
        <p>{sighting.title}</p>
        <p>{sighting.threatLevel}</p>
        <img src={sighting.imageUrl} alt='sighting pic'/>
        <p>{sighting.description}</p>
        <UserLike user={user} sighting={sighting}/>
        <Comments sighting={sighting}/>
      </div>
    );
  }
}

export default SightingDetails;
