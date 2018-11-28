import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

it('renders without crashing', () => {
  const close = jest.fn();
  shallow(<Modal isOpen={false} close={close} />);
});
