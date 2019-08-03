import React from 'react';
import './MostRecent.scss';
import sightingRequests from '../../helpers/data/sightingRequests';
import SightingItem from '../SightingItem/SightingItem';

class MostRecent extends React.Component {
  state = {
    sightings: [],
  }

  componentDidMount() {
    this.getMostRecent();
  }

  getMostRecent = () => {
    sightingRequests.getMostRecent()
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
        <h1>MostRecent</h1>
        {sightingItemComponents}
      </div>
    );
  }
}

export default MostRecent;
