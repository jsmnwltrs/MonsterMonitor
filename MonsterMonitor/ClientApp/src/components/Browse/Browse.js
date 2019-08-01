import React from 'react';
import './Browse.scss';

import sightingRequests from '../../helpers/data/sightingRequests';
import SightingItem from '../SightingItem/SightingItem';
import Filters from '../Filters/Filters';

class Browse extends React.Component {
  state = {
    sightings: [],
  }

  componentDidMount() {
    this.setSightings();
  }

  setSightings = () => {
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
        <Filters setSightings={this.setSightings}/>
        {sightingItemComponents}
      </div>
    );
  }
}

export default Browse;
