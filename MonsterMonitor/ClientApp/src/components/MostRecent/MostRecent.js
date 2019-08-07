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
      <div className='m-5'>
        <div className='recent-header'>
        <h1 className='m-2'>Most Recent</h1>
        </div>
        {sightingItemComponents}
      </div>
    );
  }
}

export default MostRecent;
