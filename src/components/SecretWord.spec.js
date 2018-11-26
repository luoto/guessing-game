import React from 'react';
import { shallow } from 'enzyme';
import SecretWord from './SecretWord';

it('renders without crashing', () => {
  shallow(<SecretWord secretWord={''} revealedLetters={[]} />);
});

it('renders with all underscores', () => {
  const wrapper = shallow(
    <SecretWord secretWord={'linkedin'} revealedLetters={[]} />
  );

  wrapper.find('div[data-test="letter"]').forEach(node => {
    expect(node.text()).toEqual('_');
  });
});

it('renders with 8 underscores', () => {
  const wrapper = shallow(
    <SecretWord secretWord={'linkedin'} revealedLetters={[]} />
  );

  let numberOfUnderScores = 0;
  wrapper.find('div[data-test="letter"]').forEach(node => {
    if (node.text() === '_') {
      numberOfUnderScores += 1;
    }
  });

  expect(numberOfUnderScores).toEqual(8);
});

it('renders with 7 underscores', () => {
  const wrapper = shallow(
    <SecretWord secretWord={'linkedin'} revealedLetters={['l']} />
  );

  let numberOfUnderScores = 0;
  wrapper.find('div[data-test="letter"]').forEach(node => {
    if (node.text() === '_') {
      numberOfUnderScores += 1;
    }
  });

  expect(numberOfUnderScores).toEqual(7);
});

it('renders with 1 l', () => {
  const wrapper = shallow(
    <SecretWord secretWord={'linkedin'} revealedLetters={['l']} />
  );

  let numberOfl = 0;
  wrapper.find('div[data-test="letter"]').forEach(node => {
    if (node.text() === 'l') {
      numberOfl += 1;
    }
  });

  expect(numberOfl).toEqual(1);
});

it('renders with 6 underscores', () => {
  const wrapper = shallow(
    <SecretWord secretWord={'linkedin'} revealedLetters={['i']} />
  );

  let numberOfUnderScores = 0;
  wrapper.find('div[data-test="letter"]').forEach(node => {
    if (node.text() === '_') {
      numberOfUnderScores += 1;
    }
  });

  expect(numberOfUnderScores).toEqual(6);
});

it('renders with 2 i', () => {
  const wrapper = shallow(
    <SecretWord secretWord={'linkedin'} revealedLetters={['i']} />
  );

  let numberOfi = 0;
  wrapper.find('div[data-test="letter"]').forEach(node => {
    if (node.text() === 'i') {
      numberOfi += 1;
    }
  });

  expect(numberOfi).toEqual(2);
});
