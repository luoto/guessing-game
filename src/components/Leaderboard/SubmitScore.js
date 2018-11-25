import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import stopPropagation from '../../helpers/stopPropagation';

const SubmitScoreWrapper = styled.div`
  visibility: ${props => (props.shouldShow ? 'visible' : 'hidden')};
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
  saveScore: PropTypes.func
};

export default SubmitScore;
