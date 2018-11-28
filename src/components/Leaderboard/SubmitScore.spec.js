import React from 'react';
import { mount } from 'enzyme';
import SubmitScore from './SubmitScore';

it('renders without crashing', () => {
  mount(<SubmitScore />);
});

it('shows', () => {
  let wrapper = mount(<SubmitScore shouldShow={true} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'block');
});

it('does not show', () => {
  let wrapper = mount(<SubmitScore shouldShow={false} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'none');
});

it('should submit luoto', () => {
  const saveScore = jest.fn();
  let wrapper = mount(<SubmitScore shouldShow={true} saveScore={saveScore} />);
  wrapper
    .find('input')
    .simulate('change', { target: { name: 'username', value: 'luoto' } });
  wrapper.find('button').simulate('click');

  expect(saveScore).toBeCalledWith('luoto');
});
