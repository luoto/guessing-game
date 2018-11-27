import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PLAYER2 } from './GuessingGame';

const WinnerContainer = styled.div`
  span {
    margin-left: 8px;
  }
`;

const DisplayWinningText = () => (
  <h2>
    We have a Winner!
    <span role="img" aria-label="cheers!">
      🎉
    </span>
  </h2>
);

const DisplayLosingText = () => (
  <h2>
    Try again next time
    <span role="img" aria-label="sad">
      😰
    </span>
  </h2>
);

const Winner = ({ gameover, winner }) =>
  gameover && (
    <WinnerContainer>
      {winner === PLAYER2 ? DisplayWinningText() : DisplayLosingText()}
    </WinnerContainer>
  );

Winner.propTypes = {
  winner: PropTypes.string,
  gameover: PropTypes.bool.isRequired
};

export default Winner;
