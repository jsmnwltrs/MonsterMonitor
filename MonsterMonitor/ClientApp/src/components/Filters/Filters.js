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
    filteredResults: [],
    searchInput: '',
    dropdownOpen: false,
    dropdownValue: 'All',
    threatLevels: ['Safe', 'Unknown', 'Risky', 'Dangerous', 'Fatal', 'All'],
  }

  componentDidMount() {
    this.setSightings();
  }

  setSightingResults = (results) => {
    const { setResults } = this.props;
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
          this.setSightingResults(results);
        })
        .catch();
    }
  }

  changeThreatLevelValue = (e) => {
    const dropdownValue = e.target.value;
    this.setState({ dropdownValue });
    this.filterThreatLevel(dropdownValue);
  }

  searchChange = (value, e) => {
    const { results } = this.state;
    const filteredResults = [];
    e.preventDefault();
    if (!value) {
      this.setSightingResults(results);
    } else {
      results.forEach((result) => {
        if (result.title.toLowerCase().includes(value.toLowerCase())
        || result.description.toLowerCase().includes(value.toLowerCase())
        || result.location.toLowerCase().includes(value.toLowerCase())) {
          filteredResults.push(result);
        }
        this.setState({ filteredResults });
        this.setSightingResults(filteredResults);
      });
    }
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
            id='search'
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
