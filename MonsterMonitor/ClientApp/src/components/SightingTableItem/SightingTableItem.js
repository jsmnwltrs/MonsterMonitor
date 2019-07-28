import React from 'react';
import './SightingTableItem.scss';
import sightingShape from '../../helpers/props/sightingShape';

class SightingTableItem extends React.Component {
  static propTypes = {
    sighting: sightingShape,
  }

  goToSightingDetails = () => {
    const { sighting } = this.props;
    this.props.history.push(`/sightingdetails/${sighting.id}`);
  }

  render() {
    const { sighting } = this.props;

    return (
      <tr className="sighting-item" onClick={this.goToSightingDetails}>
        <th>{sighting.title}</th>
        <th>{sighting.location}</th>
        <td>{sighting.threatLevel}</td>
        <td>{(sighting.isActive === true) ? 'Active' : 'Inactive'}</td>
        <td>{(sighting.isAnon === true) ? 'Yes' : 'No' }</td>
        <td>
          <button className="btn btn-default" onClick={this.deleteProductEvent}>
              <i className="fas fa-trash-alt"></i>
          </button>
          <button className="btn btn-default" onClick={this.showEditForm}>
              <i className="fas fa-pencil-alt"></i>
          </button>
          </td>
        </tr>
    );
  }
}

export default SightingTableItem;
