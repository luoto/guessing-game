import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

it('renders without crashing', () => {
  const resetGame = jest.fn();
  const toggle = jest.fn();
  shallow(<Nav resetGame={resetGame} toggle={toggle} />);
});
