import React from 'react';
import { shallow } from 'enzyme';
import GuessedWords from './GuessedWords';

it('renders without crashing', () => {
  const words = ['hello', 'apple', 'jack'];
  shallow(<GuessedWords words={words} />);
});
