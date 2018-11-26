import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: absolute;
  padding: 40px;
  background: white;
`;
const Close = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

class Modal extends React.Component {
  render() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <ModalWrapper>
        <Close onClick={this.props.close}>
          <i className="fas fa-times" />
        </Close>
        {this.props.children}
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default Modal;
