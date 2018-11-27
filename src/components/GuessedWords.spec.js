import React from 'react';
import { shallow } from 'enzyme';
import GuessedWords from './GuessedWords';

it('renders without crashing', () => {
  shallow(<GuessedWords />);
});
