import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const Table = styled.table`
  width: 100%;

  th {
    text-align: left;
  }
`;

class Scoreboard extends Component {
  render() {
    return (
      <Table>
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
      </Table>
    );
  }
}

Scoreboard.propTypes = {
  scores: PropTypes.array.isRequired
};

export default Scoreboard;
