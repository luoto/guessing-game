import React from 'react';
import { shallow } from 'enzyme';
import Winner from './Winner';

it('renders without crashing', () => {
  const secretWord = 'horse';
  shallow(<Winner gameover={true} secretWord={secretWord} />);
});

it('empty render', () => {
  const secretWord = 'horse';
  let wrapper = shallow(<Winner gameover={false} secretWord={secretWord} />);
  expect(wrapper).toBeEmptyRender();
});
