import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../client/src/App.jsx';
import Search from '../client/src/components/Search.jsx';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

test('<Search />', () => {

  it('renders a PlacesAutocomplete component', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find(PlacesAutocomplete)).to.exist
  });

  it('sets the value of the input to the states searchTerm', () => {
    const wrapper = mount(<Search />);
    wrapper.setState({ address: '944 Market Street' });
    expect(wrapper.find(PlacesAutocomplete).props().value).to.equal('944 Market Street')
  });

});
