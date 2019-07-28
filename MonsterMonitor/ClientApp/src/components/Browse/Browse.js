import React from 'react';
import './Browse.scss';

import sightingRequests from '../../helpers/data/sightingRequests';
import SightingItem from '../SightingItem/SightingItem';

class Browse extends React.Component {
  state = {
    sightings: [],
  }

  componentDidMount() {
    this.setStates();
  }

  setStates = () => {
    sightingRequests.getSightingsByIsActive(true)
      .then((sightings) => {
        this.setState({ sightings });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { sightings } = this.state;

    const sightingItemComponents = sightings.map(sighting => (
      <SightingItem
        key={sighting.id}
        sighting={sighting}
        history={this.props.history}
      />
    ));

    return (
      <div>
        <h1>Browse</h1>
        {sightingItemComponents}
      </div>
    );
  }
}

export default Browse;
