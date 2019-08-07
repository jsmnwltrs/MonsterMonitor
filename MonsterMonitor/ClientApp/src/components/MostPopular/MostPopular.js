import React from 'react';
import './MostPopular.scss';
import sightingRequests from '../../helpers/data/sightingRequests';
import SightingItem from '../SightingItem/SightingItem';

class MostPopular extends React.Component {
  state = {
    sightings: [],
  }

  componentDidMount() {
    this.getMostPopular();
  }

  getMostPopular = () => {
    sightingRequests.getMostPopular()
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
      <div className='mr-5 ml-5 mb-5'>
        <div className='popular-header'>
        <h1 className='mt-2 mb-2 ml-3'>Most Popular</h1>
        </div>
        <div className='items-container d-flex flex-wrap justify-content-center'>
        {sightingItemComponents}
        </div>
      </div>
    );
  }
}

export default MostPopular;
