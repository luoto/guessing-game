import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import stopPropagation from '../../helpers/stopPropagation';

const SubmitScoreWrapper = styled.div`
  display: ${props => (props.shouldShow ? 'block' : 'none')};
  margin-bottom: 16px;

  input {
    margin-right: 8px;
    padding: 2px 4px;
    border: 1px solid #c0c0c0;
  }

  button {
    height: 25px;
    border: 1px solid #c0c0c0;
    border-radius: 2px;
    background: none;
    cursor: pointer;

    &:hover {
      border: 1px solid #82c91e;
      background: #82c91e;
      color: white;
    }
  }
`;

class SubmitScore extends Component {
  state = {
    username: ''
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  saveScore = e => {
    this.props.saveScore(this.state.username);
  };

  render() {
    return (
      <SubmitScoreWrapper shouldShow={this.props.shouldShow}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={stopPropagation}
        />
        <button onClick={this.saveScore}>Submit</button>
      </SubmitScoreWrapper>
    );
  }
}

SubmitScore.proptypes = {
  shouldShow: PropTypes.bool.isRequired,
  saveScore: PropTypes.func.isRequired
};

export default SubmitScore;
