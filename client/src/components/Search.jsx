import React from 'react';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(searchTerm) {
    this.setState({
      searchTerm
    });
  }

  handleSelect(address) {
    this.setState({
      searchTerm: address
      // loading: true
    });

    geocodeByAddress(address)
      .then(results => results[0])
      .then((address) => {
        // Property Lookup by Type
        const componentsByType = {};
        address['address_components'].forEach((component) => {
          componentsByType[component['types'][0]] = component;
        });
        // Data for Get Request
        const searchData = {};
        searchData['city'] = componentsByType['locality'] ? componentsByType['locality'].long_name : null;
        searchData['state'] = componentsByType['administrative_area_level_1'] ? componentsByType['administrative_area_level_1'].long_name : null,
        searchData['country'] = componentsByType['country'] ? componentsByType['country'].long_name : null;

        this.props.onSearch(searchData);
      })
      .catch(error => console.error('Error', error));
  }

  render() {
    const inputProps = {
      value: this.state.searchTerm,
      onChange: this.handleChange,
      id: "homeswap-search",
      class: "search__input",
      placeholder: "Where to go?"
    }
    const cssClasses = {
      root: 'form-group',
      input: 'form-control'
    }
    return (
      <div className='container'>
        <PlacesAutocomplete
          inputProps={inputProps}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          highlightFirstSuggestion={true}
          googleLogo={false} />
      </div>
    );
  }
}

export default Search;
