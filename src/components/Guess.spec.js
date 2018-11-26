import React from 'react';
import { shallow } from 'enzyme';
import Guess from './Guess';
import letters from '../constants/letters';

it('renders without crashing', () => {
  const onGuess = jest.fn();
  shallow(
    <Guess
      onGuess={onGuess}
      letters={letters}
      incorrectlyGuessedLetters={[]}
      correctlyGuessedLetters={[]}
    />
  );
});

it('calls onGuess when letter is clicked', () => {
  const onGuess = jest.fn();
  const wrapper = shallow(
    <Guess
      onGuess={onGuess}
      letters={letters}
      incorrectlyGuessedLetters={[]}
      correctlyGuessedLetters={[]}
    />
  );

  wrapper.find('#a').simulate('click', { target: { textContent: 'a' } });
  wrapper.find('#p').simulate('click', { target: { textContent: 'p' } });
  wrapper.find('#c').simulate('click', { target: { textContent: 'c' } });

  expect(onGuess).toHaveBeenCalledTimes(3);
});

it('calls onGuess with correct letter when clicked', () => {
  const onGuess = jest.fn();
  const wrapper = shallow(
    <Guess
      onGuess={onGuess}
      letters={letters}
      incorrectlyGuessedLetters={[]}
      correctlyGuessedLetters={[]}
    />
  );

  wrapper.find('#a').simulate('click', { target: { textContent: 'a' } });
  wrapper.find('#p').simulate('click', { target: { textContent: 'p' } });
  wrapper.find('#c').simulate('click', { target: { textContent: 'c' } });

  expect(onGuess.mock.calls).toEqual([['a'], ['p'], ['c']]);
});

it('calls onGuess with correct letter on keyDown', () => {
  const onGuess = jest.fn();
  const hash = {};
  window.addEventListener = jest.fn((event, cb) => {
    hash[event] = cb;
  });

  shallow(
    <Guess
      onGuess={onGuess}
      letters={letters}
      incorrectlyGuessedLetters={[]}
      correctlyGuessedLetters={[]}
    />
  );

  hash.keydown({ key: 'a' });

  expect(onGuess.mock.calls).toEqual([['a']]);
});

it('does not call onGuess with guessed letter on keyDown', () => {
  const onGuess = jest.fn();
  const hash = {};
  window.addEventListener = jest.fn((event, cb) => {
    hash[event] = cb;
  });

  shallow(
    <Guess
      onGuess={onGuess}
      letters={letters}
      incorrectlyGuessedLetters={['a']}
      correctlyGuessedLetters={[]}
    />
  );

  hash.keydown({ key: 'a' });

  expect(onGuess.mock.calls).toEqual([]);
});

it('calls onGuess with correct word when supplied', () => {
  const onGuess = jest.fn();
  const wrapper = shallow(
    <Guess
      onGuess={onGuess}
      letters={letters}
      incorrectlyGuessedLetters={[]}
      correctlyGuessedLetters={[]}
    />
  );

  const WORD = 'dragon';
  const input = wrapper.find('input');
  const button = wrapper.find('button[data-test="submit-word"]');

  input.simulate('change', { target: { name: 'guess', value: WORD } });
  button.simulate('click');

  expect(onGuess.mock.calls).toEqual([[WORD]]);
});

it('disable guessed letters', () => {
  const onGuess = jest.fn();
  const wrapper = shallow(
    <Guess
      onGuess={onGuess}
      letters={letters}
      incorrectlyGuessedLetters={['g']}
      correctlyGuessedLetters={['h']}
    />
  );

  expect(wrapper.find('#g')).toBeDisabled();
  expect(wrapper.find('#h')).toBeDisabled();
});

it('enable non-guessed letters', () => {
  const onGuess = jest.fn();
  const wrapper = shallow(
    <Guess
      onGuess={onGuess}
      letters={letters}
      incorrectlyGuessedLetters={['g']}
      correctlyGuessedLetters={['h']}
    />
  );

  expect(wrapper.find('#f')).not.toBeDisabled();
  expect(wrapper.find('#i')).not.toBeDisabled();
});
