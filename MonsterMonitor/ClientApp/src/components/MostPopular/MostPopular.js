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
      <div>
        <h1>MostPopular</h1>
        {sightingItemComponents}
      </div>
    );
  }
}

export default MostPopular;
