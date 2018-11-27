import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SubmitScore from './SubmitScore';
import Scoreboard from './Scoreboard';

class Leaderboard extends Component {
  state = {
    scores: [],
    showSubmit: true
  };

  componentDidMount() {
    this.setState({ scores: JSON.parse(localStorage.getItem('scores')) || [] });
  }

  saveScore = username => {
    let { scores } = this.state;
    let { difficulty, score } = this.props;

    scores.push({ username, score, difficulty, date: Date.now() });
    scores.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else if (b.score < a.score) {
        return -1;
      } else if (a.date < b.date) {
        return -1;
      } else if (b.date < a.date) {
        return 1;
      } else {
        return 0;
      }
    });

    localStorage.setItem('scores', JSON.stringify(scores));

    this.setState(prevState => ({
      scores,
      showSubmit: !prevState.showSubmit
    }));
  };

  render() {
    const { showSubmit, scores } = this.state;
    const shouldShowSubmit = this.props.playerwin && showSubmit;

    return (
      <div>
        <h2>Leaderboard</h2>
        <SubmitScore shouldShow={shouldShowSubmit} saveScore={this.saveScore} />
        <Scoreboard scores={scores} />
      </div>
    );
  }
}

Leaderboard.propTypes = {
  score: PropTypes.number,
  difficulty: PropTypes.string,
  playerwin: PropTypes.bool
};

export default Leaderboard;
