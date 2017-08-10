import React from 'react';
import { mount } from 'enzyme';
// import App from '../client/src/index.jsx';
import Search from '../client/src/components/Search.jsx';


describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

// test('Check searchTerm state is being tracked', () => {
// 	const wrapper = mount(
//     <Search/>
//   );

//   console.log('HELLO', wrapper.text());
//   expect(wrapper.text().toEqual(''));
//   wrapper.find('FormControl').simulate('change');
//   expect(wrapper.text()).toEqual('')
// })
