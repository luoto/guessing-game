import React from 'react';
import { shallow } from 'enzyme';
import Hint from './Hint';

it('renders without crashing', () => {
  shallow(<Hint word="horse" />);
});
