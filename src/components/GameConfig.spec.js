import React from 'react';
import { shallow } from 'enzyme';
import GameConfig from './GameConfig';

/*
 * Encountered issue when trying to mock localstorage methods
 * See: https://github.com/facebook/jest/issues/6858#issuecomment-413677180
 */

it('renders without crashing', () => {
  const childAsAFunction = jest.fn();
  shallow(<GameConfig>{childAsAFunction}</GameConfig>);
});

it('retrieves settings from localStorage', async () => {
  let getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

  const childAsAFunction = jest.fn();
  shallow(<GameConfig>{childAsAFunction}</GameConfig>);
  expect(getItemSpy).toBeCalledWith('difficulty');
});

it('saves settings to localStorage', () => {
  let setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  const childAsAFunction = jest.fn(props => {
    props.saveSettings('medium');
  });

  shallow(<GameConfig>{childAsAFunction}</GameConfig>);
  expect(setItemSpy).toBeCalledWith('difficulty', 'medium');
});
