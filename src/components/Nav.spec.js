import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

it('renders without crashing', () => {
  const resetGame = jest.fn();
  const toggle = jest.fn();
  shallow(<Nav resetGame={resetGame} toggle={toggle} />);
});

it('calls reset once and toggle 4 times', () => {
  const resetGame = jest.fn();
  const toggle = jest.fn();
  const wrapper = shallow(<Nav resetGame={resetGame} toggle={toggle} />);

  wrapper.find('button').forEach(button => button.simulate('click'));

  expect(resetGame).toHaveBeenCalledTimes(1);
  expect(toggle).toHaveBeenCalledTimes(4);
});
