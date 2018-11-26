import React from 'react';
import { shallow } from 'enzyme';
import Winner from './Winner';

it('renders without crashing', () => {
  shallow(<Winner gameover={true} />);
});

it('empty render', () => {
  let wrapper = shallow(<Winner gameover={false} />);
  expect(wrapper).toBeEmptyRender();
});
