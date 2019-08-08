import React from 'react';
import {
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './SightingTable.scss';
import sightingShape from '../../helpers/props/sightingShape';
import SightingTableItem from '../SightingTableItem/SightingTableItem';

class SightingTable extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
    sighings: PropTypes.arrayOf(sightingShape),
    passSighting: PropTypes.func,
    changeIsEditing: PropTypes.func,
    changeIsActive: PropTypes.func,
    setIsActiveFilter: PropTypes.func,
    setSightings: PropTypes.func,
  }

  render() {
    const { sightings } = this.props;

    const sightingTableItemComponents = sightings.map(sighting => (
      <SightingTableItem
        sighting={sighting}
        key={sighting.id}
        changeIsEditing={this.props.changeIsEditing}
        passSighting={this.props.passSighting}
        changeIsActive={this.props.changeIsActive}
        history={this.props.history}
      />
    ));

    return (
      <div className='sighting-table'>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Threat Level</th>
              <th>Status</th>
              <th>Anon</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='sighting-items'>
            {sightingTableItemComponents}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SightingTable;
