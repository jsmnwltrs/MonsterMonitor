import React from 'react';
import PropTypes from 'prop-types';
import './SightingManagement.scss';
import sightingRequests from '../../helpers/data/sightingRequests';
import SightingTable from '../SightingTable/SightingTable';
import SightingModal from '../SightingModal/SightingModal';

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
  isActive: true,
  isAnon: false,
  latitude: 0,
  longitude: 0,
};

class SightingManagement extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
  }

  state = {
    isEditing: false,
    sighting: defaultSighting,
    sightings: [],
  }

  componentDidMount() {
    this.setSightings();
  }

  setSightings = () => {
    const { userId } = this.props;
    sightingRequests.getSightingsByUserId(userId)
      .then((sightings) => {
        this.setState({ sightings });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setIsActiveFilter = (sightings) => {
    this.setState({ sightings });
  }

  onSubmitSighting = (sightingObject) => {
    if (this.state.isEditing) {
      sightingRequests.updateSighting(sightingObject);
      this.setState({ isEditing: false });
      this.setSightings();
    } else {
      sightingRequests.addSighting(sightingObject);
      this.setSightings();
    }
  }

  changeIsEditing = (bool) => {
    this.setState({ isEditing: bool });
  }

  passSighting = (sighting) => {
    this.setState({ sighting });
  }

  changeIsActive = (sighting) => {
    sightingRequests.updateSighting(sighting)
      .then(() => {
        this.setSightings();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='sighting-container'>
          <h2>Your Sightings</h2>
          <SightingModal
          onSubmit={this.onSubmitSighting}
          isEditing={this.state.isEditing}
          changeIsEditing={this.changeIsEditing}
          sighting={this.state.sighting}
          userId={this.props.userId}
          />
          <SightingTable
          userId={this.props.userId}
          sightings={this.state.sightings}
          changeIsEditing={this.changeIsEditing}
          passSighting={this.passSighting}
          changeIsActive={this.changeIsActive}
          setIsActiveFilter={this.setIsActiveFilter}
          setSightings={this.setSightings}
          history={this.props.history}
          />
        </div>
    );
  }
}

export default SightingManagement;
