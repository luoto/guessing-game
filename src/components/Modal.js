import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 200px;
  left: 50%;
  width: 400px;
  margin-left: calc(-200px - 80px); /* also accounts for the nav bar*/
  padding: 16px 32px 32px 32px;
  border-radius: 5px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Close = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: none;
  color: #e0e0e0;
  cursor: pointer;

  &:hover {
    background: rgba(255, 0, 0, 0.3);
    color: red;
  }
`;

class Modal extends React.Component {
  render() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <ModalBackground>
        <ModalWrapper>
          <Close onClick={this.props.close}>
            <i className="fas fa-times" />
          </Close>
          {this.props.children}
        </ModalWrapper>
      </ModalBackground>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default Modal;
