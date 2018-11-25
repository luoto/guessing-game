import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Scoreboard extends Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Date</th>
              <th>Difficulty</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.props.scores.map(score => {
              return (
                <tr key={score.date}>
                  <td>{score.username}</td>
                  <td>{moment(score.date).format('l')}</td>
                  <td>{score.difficulty}</td>
                  <td>{score.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Scoreboard.propTypes = {
  scores: PropTypes.array.isRequired
};

export default Scoreboard;
