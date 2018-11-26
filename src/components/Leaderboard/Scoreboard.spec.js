import React from 'react';
import { shallow } from 'enzyme';
import Scoreboard from './Scoreboard';

it('renders without crashing', () => {
  shallow(<Scoreboard scores={[]} />);
});

it('renders with 1 row', () => {
  let wrapper = shallow(
    <Scoreboard
      scores={[
        {
          username: 'luoto',
          date: Date.parse('11/25/2018'),
          difficulty: 'medium',
          score: 5
        }
      ]}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
