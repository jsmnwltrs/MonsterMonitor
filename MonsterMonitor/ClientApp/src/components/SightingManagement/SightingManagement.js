import React from 'react';
import PropTypes from 'prop-types';
import './SightingManagement.scss';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import sightingRequests from '../../helpers/data/sightingRequests';
import SightingTable from '../SightingTable/SightingTable';
import SightingModal from '../SightingModal/SightingModal';
import activeStatuses from '../../helpers/data/ActiveStatuses';

const defaultSighting = {
  id: 0,
  userId: 0,
  title: '',
  location: '',
  description: '',
  imageUrl: '',
  videoUrl: '',
  dateCreated: '',
  threatLevel: '',
  isActive: true,
  isAnon: false,
  latitude: 0,
  longitude: 0,
};

class SightingManagement extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
  }

  state = {
    isEditing: false,
    sighting: defaultSighting,
    sightings: [],
    dropdownValue: 'All',
    dropdownOpen: false,
    dropdownOptions: activeStatuses,
  }

  componentDidMount() {
    this.setSightings();
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
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

  setIsActiveFilter = (sightings) => {
    this.setState({ sightings });
  }

  onSubmitSighting = (sightingObject) => {
    if (this.state.isEditing) {
      sightingRequests.updateSighting(sightingObject)
        .then(() => {
          this.setState({ isEditing: false });
          this.setSightings();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      sightingRequests.addSighting(sightingObject)
        .then(() => {
          this.setSightings();
        }).catch((error) => {
          console.error(error);
        });
    }
  }

  changeIsEditing = (bool) => {
    this.setState({ isEditing: bool });
  }

  passSighting = (sighting) => {
    this.setState({ sighting });
  }

  changeIsActive = (sighting) => {
    sightingRequests.updateSighting(sighting)
      .then(() => {
        this.setSightings();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changeValue = (e) => {
    const dropdownValue = e.target.value;
    this.setState({ dropdownValue });
    this.filterHandler(dropdownValue);
  }

  filterHandler = (dropdownValue) => {
    const { userId } = this.props;
    if (dropdownValue === 'All') {
      this.setSightings();
    } else if (dropdownValue === 'Active') {
      sightingRequests.getSightingsByUserIdAndIsActive(userId, true)
        .then((sightings) => {
          this.setIsActiveFilter(sightings);
        }).catch((error) => {
          console.error(error);
        });
    } else {
      sightingRequests.getSightingsByUserIdAndIsActive(userId, false)
        .then((sightings) => {
          this.setIsActiveFilter(sightings);
        }).catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const { dropdownOptions, dropdownValue } = this.state;

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
      <div className='sighting-container m-5'>
        <div className='table-header d-flex justify-content-between'>
            <div className='m-3'><h2>Your Sightings</h2></div>
            <div className='table-header d-flex flex-wrap'>
            <div className='m-3'>
            <SightingModal
              onSubmit={this.onSubmitSighting}
              isEditing={this.state.isEditing}
              changeIsEditing={this.changeIsEditing}
              sighting={this.state.sighting}
              userId={this.props.userId}
              />
            </div>
            <div className='m-3'>
            <Dropdown className='' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {dropdownValue}
                </DropdownToggle>
                <DropdownMenu>
                  {filterOptions}
                </DropdownMenu>
              </Dropdown>
            </div>
            </div>
        </div>
          <SightingTable
          userId={this.props.userId}
          sightings={this.state.sightings}
          changeIsEditing={this.changeIsEditing}
          passSighting={this.passSighting}
          changeIsActive={this.changeIsActive}
          setIsActiveFilter={this.setIsActiveFilter}
          setSightings={this.setSightings}
          history={this.props.history}
          />
      </div>
    );
  }
}

export default SightingManagement;
