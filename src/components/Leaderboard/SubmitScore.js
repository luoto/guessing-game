import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubmitScore extends Component {
  state = {
    username: ''
  };

  preventPropagation = e => {
    e.stopPropagation();
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
      <div>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.preventPropagation}
        />
        <button onClick={this.saveScore}>Submit</button>
      </div>
    );
  }
}

SubmitScore.proptypes = {
  saveScore: PropTypes.func
};

export default SubmitScore;
