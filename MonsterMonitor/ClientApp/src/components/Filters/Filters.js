import React from 'react';
import SearchField from 'react-search-field';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import './Filters.scss';
import PropTypes from 'prop-types';
import sightingRequests from '../../helpers/data/sightingRequests';

class Filters extends React.Component {
  static propTypes = {
    setResults: PropTypes.func,
  }

  state = {
    results: [],
    searchInput: '',
    dropdownOpen: false,
    dropdownValue: 'All',
    threatLevels: ['Safe', 'Unknown', 'Risky', 'Dangerous', 'Fatal', 'All'],
  }

  componentDidMount() {
    this.setSightings();
  }

  setSightingResults = () => {
    const { setResults } = this.props;
    const { results } = this.state;
    setResults(results);
  }

  setSightings = () => {
    sightingRequests.getSightingsByIsActive(true)
      .then((results) => {
        this.setState({ results });
        this.setSightingResults(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  filterThreatLevel = (dropdownValue) => {
    if (dropdownValue === 'All') {
      this.setSightings();
    } else {
      sightingRequests.getSightingsByThreatLevel(dropdownValue)
        .then((results) => {
          this.setState({ results });
          this.setSightingResults();
        })
        .catch();
    }
  }

  changeThreatLevelValue = (e) => {
    const dropdownValue = e.target.value;
    this.setState({ dropdownValue });
    this.filterThreatLevel(dropdownValue);
  }

  searchChange = (e) => {
    const searchInput = e.target.value;
    this.setState({ searchInput });
  }

  render() {
    const {
      threatLevels,
      dropdownValue,
    } = this.state;

    const threatLevelItems = threatLevels.map((threatLevel) => {
      if (dropdownValue === threatLevel) {
        return <div></div>;
      }
      return (<DropdownItem
        id={threatLevel}
        value={threatLevel}
        onClick={this.changeThreatLevelValue}>
        {threatLevel}
        </DropdownItem>);
    });

    return (
      <div>
        <div className='search-container'>
          <SearchField
            placeholder="Search sightings..."
            onChange={this.searchChange}
            classNames="test-class"
          />
        </div>
        <div className='threat-container'>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            Threat Level:
            <DropdownToggle caret>
              {dropdownValue}
            </DropdownToggle>
            <DropdownMenu>
              {threatLevelItems}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Filters;
