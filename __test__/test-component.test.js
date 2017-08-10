import React from 'react';
import { mount } from 'enzyme';
import Test from '../client/src/test-component.jsx';

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

test('Test component have "Hello" in its p tag', () => {
  const wrapper = mount(
    <Test />
  );
  const p = wrapper.find('.test');
  expect(p.text()).toBe('Hello');
});


