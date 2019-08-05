import React from 'react';
import {
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './SightingTable.scss';
import sightingShape from '../../helpers/props/sightingShape';
import SightingTableItem from '../SightingTableItem/SightingTableItem';
import sightingRequests from '../../helpers/data/sightingRequests';
import activeStatuses from '../../helpers/data/ActiveStatuses';

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

  state = {
    dropdownValue: 'All',
    dropdownOpen: false,
    dropdownOptions: activeStatuses,
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  changeValue = (e) => {
    const dropdownValue = e.target.value;
    this.setState({ dropdownValue });
    this.filterHandler(dropdownValue);
  }

  filterHandler = (dropdownValue) => {
    const { setIsActiveFilter, setSightings, userId } = this.props;
    if (dropdownValue === 'All') {
      setSightings();
    } else if (dropdownValue === 'Active') {
      sightingRequests.getSightingsByUserIdAndIsActive(userId, true)
        .then((sightings) => {
          setIsActiveFilter(sightings);
        }).catch((error) => {
          console.error(error);
        });
    } else {
      sightingRequests.getSightingsByUserIdAndIsActive(userId, false)
        .then((sightings) => {
          setIsActiveFilter(sightings);
        }).catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const { sightings } = this.props;
    const { dropdownOptions, dropdownValue } = this.state;

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

    const filterOptions = dropdownOptions.map((activeStatus) => {
      if (dropdownValue === activeStatus.option) {
        return <div key={activeStatus.id}></div>;
      }
      return (
        <DropdownItem
        key={activeStatus.id}
        value={activeStatus.option}
        onClick={this.changeValue}>
        {activeStatus.option}
        </DropdownItem>
      );
    });

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
              <th>
              <div className='threat-container'>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  Status:
                <DropdownToggle caret>
                  {dropdownValue}
                </DropdownToggle>
                <DropdownMenu>
                  {filterOptions}
                </DropdownMenu>
                </Dropdown>
        </div>
              </th>
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
