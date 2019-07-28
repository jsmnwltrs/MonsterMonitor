import React from 'react';
import './SightingDetails.scss';
import sightingRequests from '../../helpers/data/sightingRequests';

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

class SightingDetails extends React.Component {
  state = {
    sighting: defaultSighting,
  }

  componentDidMount() {
    this.setSighting();
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

  render() {
    const { sighting } = this.state;

    return (
      <div>
        Sighting Details
        <p>{sighting.title}</p>
        <p>{sighting.threatLevel}</p>
        <img src={sighting.imageUrl} alt='sighting pic'/>
        <p>{sighting.description}</p>
      </div>
    );
  }
}

export default SightingDetails;
