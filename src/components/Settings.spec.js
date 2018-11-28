import React from 'react';
import { shallow } from 'enzyme';
import Settings from './Settings';

it('renders without crashing', () => {
  shallow(<Settings />);
});

it('calls saveSettings and toggleSettings when saving', () => {
  const saveSettings = jest.fn();
  const toggleSettings = jest.fn();
  const wrapper = shallow(
    <Settings saveSettings={saveSettings} toggleSettings={toggleSettings} />
  );

  let button = wrapper.find('button');
  button.simulate('click');

  expect(saveSettings).toHaveBeenCalledTimes(1);
  expect(toggleSettings).toHaveBeenCalledTimes(1);
});

it('calls saveSettings with hard', () => {
  const saveSettings = jest.fn();
  const toggleSettings = jest.fn();
  const wrapper = shallow(
    <Settings saveSettings={saveSettings} toggleSettings={toggleSettings} />
  );

  wrapper.setState({ difficulty: 'hard' });

  let button = wrapper.find('button');
  button.simulate('click');

  expect(saveSettings).toHaveBeenCalledWith('hard');
});
