import React from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import './SightingTable.scss';
import sightingRequests from '../../helpers/data/sightingRequests';
import SightingTableItem from '../SightingTableItem/SightingTableItem';

class SightingTable extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
  }

  state = {
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

  render() {
    const { sightings } = this.state;

    const sightingTableItemComponents = sightings.map(sighting => (
      <SightingTableItem
        sighting={sighting}
        key={sighting.id}
        history={this.props.history}
      />
    ));

    return (
      <div>
        <Table dark>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Threat Level</th>
              <th>Status</th>
              <th>Anon</th>
            </tr>
          </thead>
          <tbody>
            {sightingTableItemComponents}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SightingTable;
