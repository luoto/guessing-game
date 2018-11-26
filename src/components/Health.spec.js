import React from 'react';
import { shallow } from 'enzyme';
import Health from './Health';

it('renders without crashing', () => {
  shallow(<Health totalHealth={6} currentHealth={6} />);
});

it('renders with 6 full hearts', () => {
  const wrapper = shallow(<Health totalHealth={6} currentHealth={6} />);
  expect(wrapper.find('.fas').length).toEqual(6);
});

it('renders with 2 full hearts and 4 empty hearts', () => {
  const wrapper = shallow(<Health totalHealth={6} currentHealth={2} />);
  expect(wrapper.find('.fas')).toHaveLength(2);
  expect(wrapper.find('.far')).toHaveLength(4);
});
