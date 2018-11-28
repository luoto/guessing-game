import React from 'react';
import { shallow } from 'enzyme';
import Winner from './Winner';
import { PLAYER2 } from './GuessingGame';

it('renders without crashing', () => {
  const secretWord = 'horse';
  shallow(<Winner gameover={true} secretWord={secretWord} />);
});

it('empty render', () => {
  const secretWord = 'horse';
  let wrapper = shallow(<Winner gameover={false} secretWord={secretWord} />);
  expect(wrapper).toBeEmptyRender();
});

it('displays congratulations when player2 wins', () => {
  const secretWord = 'horse';
  let wrapper = shallow(
    <Winner gameover={true} winner={PLAYER2} secretWord={secretWord} />
  );
  expect(wrapper).toMatchSnapshot();
});

it('displays better luck when player2 loses', () => {
  const secretWord = 'horse';
  let wrapper = shallow(<Winner gameover={true} secretWord={secretWord} />);
  expect(wrapper).toMatchSnapshot();
});
