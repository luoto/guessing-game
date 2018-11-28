import React from 'react';
import { shallow } from 'enzyme';
import GuessingGame, { initialState, PLAYER1, PLAYER2 } from './GuessingGame';

it('renders without crashing', () => {
  shallow(<GuessingGame difficulty="medium" />);
});

it('resets state to intial state', () => {
  let wrapper = shallow(<GuessingGame difficulty="medium" />);
  wrapper.setState({
    totalHealth: 6,
    currentHealth: 4,
    secretWord: 'afkljiowe',
    revealedLetters: ['a', 'e'],
    correctlyGuessedLetters: ['a', 'e'],
    incorrectlyGuessedLetters: ['z'],
    guessedWords: ['okay']
  });

  let instance = wrapper.instance();
  instance.resetGame();

  expect(wrapper.state('guessedWords')).toEqual(initialState.guessedWords);
  expect(wrapper.state('currentHealth')).toEqual(initialState.currentHealth);
  expect(wrapper.state('secretWord')).toEqual(initialState.secretWord);
  expect(wrapper.state('revealedLetters')).toEqual(
    initialState.revealedLetters
  );
  expect(wrapper.state('correctlyGuessedLetters')).toEqual(
    initialState.correctlyGuessedLetters
  );
});

it('decreases health on wrong guess', () => {
  let wrapper = shallow(<GuessingGame difficulty="medium" />);
  wrapper.setState({
    secretWord: 'norse',
    currentHealth: 4
  });

  let instance = wrapper.instance();
  instance.incorrect('z');

  expect(wrapper.state('currentHealth')).toEqual(3);
});

it('does not decrease health on correct guess', () => {
  let wrapper = shallow(<GuessingGame difficulty="medium" />);
  wrapper.setState({
    secretWord: 'norse',
    currentHealth: 4
  });

  let instance = wrapper.instance();
  instance.correct('r');

  expect(wrapper.state('currentHealth')).toEqual(4);
});

it('sets winner to computer when no more health', () => {
  let wrapper = shallow(<GuessingGame difficulty="medium" />);
  wrapper.setState({
    currentHealth: 1,
    secretWord: 'norse'
  });

  let instance = wrapper.instance();
  instance.incorrect('z');
  expect(wrapper.state('currentHealth')).toEqual(0);
  expect(wrapper.state('gameover')).toBeTruthy();
  expect(wrapper.state('winner')).toEqual(PLAYER1);
});

it('sets winner to guesser when word is guessed', () => {
  let wrapper = shallow(<GuessingGame difficulty="medium" />);
  wrapper.setState({
    currentHealth: 1,
    secretWord: 'dolphin'
  });

  let instance = wrapper.instance();
  instance.correct('dolphin');
  expect(wrapper.state('currentHealth')).toEqual(1);
  expect(wrapper.state('gameover')).toBeTruthy();
  expect(wrapper.state('winner')).toEqual(PLAYER2);
});
