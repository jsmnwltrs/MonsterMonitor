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
import threatLevelsArray from '../../helpers/data/threatLevels';

class Filters extends React.Component {
  static propTypes = {
    setResults: PropTypes.func,
  }

  state = {
    results: [],
    filteredResults: [],
    searchValue: '',
    dropdownOpen: false,
    dropdownValue: 'All',
    threatLevels: threatLevelsArray,
  }

  componentDidMount() {
    this.setSightings();
  }

  setSightingResults = (results) => {
    const { setResults } = this.props;
    setResults(results);
  }

  setSightings = () => {
    const { searchValue } = this.state;
    sightingRequests.getSightingsByIsActive(true)
      .then((results) => {
        this.setState({ results });
        if (searchValue === '') {
          this.setSightingResults(results);
        } else {
          this.searchChange(searchValue);
        }
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
    const { searchValue } = this.state;
    if (dropdownValue === 'All') {
      this.setSightings();
    } else {
      sightingRequests.getSightingsByThreatLevel(dropdownValue)
        .then((results) => {
          this.setState({ results });
          if (searchValue === '') {
            this.setSightingResults(results);
          } else {
            this.searchChange(searchValue)
          }
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
    this.setState({ searchValue: value })
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
        value={threatLevel.option}
        key={threatLevel.id}
        onClick={this.changeThreatLevelValue}>
        {threatLevel.option}
        </DropdownItem>);
    });

    return (
      <div>
        <div className='search-container'>
          <SearchField
            placeholder="Search sightings..."
            onChange={this.searchChange}
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
