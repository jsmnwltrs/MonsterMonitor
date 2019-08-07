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

    const makeSightingItemComponents = () => {
      if (sightings.length === 0) {
        return (
          <div className='no-results'>
            No Results Found
          </div>
        );
      }
      const sightingItemComponents = sightings.map(sighting => (
        <SightingItem
          key={sighting.id}
          sighting={sighting}
          history={this.props.history}
        />
      ));
      return sightingItemComponents;
    };

    return (
      <div>
        <Filters setResults={this.setResults}/>
        <div className='d-flex flex-wrap justify-content-center'>
          {makeSightingItemComponents()}
        </div>
      </div>
    );
  }
}

export default Browse;
