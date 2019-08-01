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

class Filters extends React.Component {
  static propTypes = {
    setSightings: PropTypes.func,
  }

  state = {
    results: [],
    searchInput: '',
    dropdownOpen: false,
    dropdownValue: 'All',
    threatLevels: ['Safe', 'Unknown', 'Risky', 'Dangerous', 'Fatal', 'All'],
    dropdownSortOpen: false,
    dropdownSortValue: 'Most Recent',
    sortOptions: ['Most Popular', 'Most Recent'],
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggleSort = () => {
    this.setState(prevState => ({
      dropdownSortOpen: !prevState.dropdownSortOpen,
    }));
  }

  changeThreatLevelValue = (e) => {
    const dropdownValue = e.target.value;
    this.setState({ dropdownValue });
  }

  changeSortValue = (e) => {
    const dropdownSortValue = e.target.value;
    this.setState({ dropdownSortValue });
  }

  searchChange = (e) => {
    const searchInput = e.target.value;
    this.setState({ searchInput });
  }

  render() {
    const {
      threatLevels,
      dropdownValue,
      sortOptions,
      dropdownSortValue,
    } = this.state;

    const threatLevelItems = threatLevels.map((threatLevel) => {
      if (dropdownValue === threatLevel) {
        return <div></div>;
      }
      return (<DropdownItem
        id={threatLevel}
        key={threatLevel}
        value={threatLevel}
        onClick={this.changeThreatLevelValue}>
        {threatLevel}
        </DropdownItem>);
    });

    const sortItems = sortOptions.map((sortOption) => {
      if (dropdownSortValue === sortOption) {
        return <div></div>;
      }
      return (
        <DropdownItem
        id={sortOption}
        key={sortOption}
        value={sortOption}
        onClick={this.changeSortValue}>
        {sortOption}
        </DropdownItem>
      );
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
        <div className='sort-container'>
          <Dropdown isOpen={this.state.dropdownSortOpen} toggle={this.toggleSort}>
            Sort By:
            <DropdownToggle caret>
              {dropdownSortValue}
            </DropdownToggle>
            <DropdownMenu>
              {sortItems}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Filters;
