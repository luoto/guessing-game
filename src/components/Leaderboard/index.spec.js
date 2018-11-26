import React from 'react';
import { shallow } from 'enzyme';
import Leaderboard from './index';

it('renders without crashing', () => {
  shallow(<Leaderboard />);
});

it('sorts scores from high to low', () => {
  let wrapper = shallow(<Leaderboard difficulty="medium" score={6} />);
  wrapper.setState({
    scores: [
      {
        username: 'luoto',
        date: Date.parse('11/22/2015'),
        difficulty: 'medium',
        score: 5
      },
      {
        username: 'luoto1',
        date: Date.parse('11/23/2015'),
        difficulty: 'medium',
        score: 5
      },
      {
        username: 'luoto2',
        date: Date.parse('11/22/2015'),
        difficulty: 'medium',
        score: 2
      },
      {
        username: 'luoto3',
        date: Date.parse('11/22/2015'),
        difficulty: 'medium',
        score: 3
      },
      {
        username: 'joe',
        date: Date.parse('11/22/2015'),
        difficulty: 'medium',
        score: 4
      }
    ]
  });

  let instance = wrapper.instance();
  instance.saveScore('steve');

  expect(wrapper.state('scores').slice(1, 5)).toEqual([
    { date: 1448179200000, difficulty: 'medium', score: 5, username: 'luoto' },
    { date: 1448265600000, difficulty: 'medium', score: 5, username: 'luoto1' },
    { date: 1448179200000, difficulty: 'medium', score: 4, username: 'joe' },
    { date: 1448179200000, difficulty: 'medium', score: 3, username: 'luoto3' }
  ]);
});
