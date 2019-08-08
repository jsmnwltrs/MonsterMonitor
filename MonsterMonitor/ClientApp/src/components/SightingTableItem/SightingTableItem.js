import React from 'react';
import './SightingTableItem.scss';
import PropTypes from 'prop-types';
import sightingShape from '../../helpers/props/sightingShape';

class SightingTableItem extends React.Component {
  static propTypes = {
    sighting: sightingShape,
    changeIsEditing: PropTypes.func,
    passSighting: PropTypes.func,
    changeIsActive: PropTypes.func,
  }

  goToSightingDetails = () => {
    const { sighting } = this.props;
    this.props.history.push(`/sightingdetails/${sighting.id}`);
  }

  showEditForm = () => {
    const { changeIsEditing, passSighting, sighting } = this.props;
    passSighting(sighting);
    changeIsEditing(true);
  }

  reactivateSighting = () => {
    const { changeIsActive } = this.props;
    const mySighting = { ...this.props.sighting };
    mySighting.isActive = true;
    changeIsActive(mySighting);
  }

  deactivateSighting = () => {
    const { changeIsActive } = this.props;
    const mySighting = { ...this.props.sighting };
    mySighting.isActive = false;
    changeIsActive(mySighting);
  }

  render() {
    const { sighting } = this.props;

    const makeButtons = () => {
      if (sighting.isActive) {
        return (
          <button className="btn" onClick={this.deactivateSighting}>
            <i className="fas fa-trash-alt"></i>
          </button>
        );
      }
      return (
        <button className="btn" onClick={this.reactivateSighting}>
          <i className="fas fa-undo-alt"></i>
        </button>
      );
    };

    return (
      <tr className="sighting-item">
        <td onClick={this.goToSightingDetails}>{sighting.title}</td>
        <td>{sighting.location}</td>
        <td>{sighting.threatLevel}</td>
        <td>{(sighting.isActive === true) ? 'Active' : 'Inactive'}</td>
        <td>{(sighting.isAnon === true) ? 'Yes' : 'No' }</td>
        <td>
          <button className="btn btn-default" onClick={this.showEditForm}>
              <i className="far fa-edit"></i>
          </button>
          {makeButtons()}
          </td>
        </tr>
    );
  }
}

export default SightingTableItem;
