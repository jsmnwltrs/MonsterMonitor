import React from 'react';
import './Browse.scss';
import SightingItem from '../SightingItem/SightingItem';
import Filters from '../Filters/Filters';

class Browse extends React.Component {
  state = {
    sightings: [],
  }

  setResults = (results) => {
    this.setState({ sightings: results });
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
        <Filters setResults={this.setResults}/>
        {sightingItemComponents}
      </div>
    );
  }
}

export default Browse;
