import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PLAYER2 } from './GuessingGame';

const WinnerContainer = styled.div`
  span {
    margin-left: 8px;
  }
`;

const Banner = styled.p`
  margin-top: 24px;
  padding: 8px;
  background: #f0f0f0;
  border-radius: 3px;
  text-align: center;
  font-weight: 900;
`;

const DisplayWinningText = () => (
  <Banner>
    Congratulations!
    <span role="img" aria-label="cheers!">
      🎉
    </span>
  </Banner>
);

const DisplayLosingText = secretWord => (
  <Banner>
    Better luck next time, the secret word was {secretWord}...
    <span role="img" aria-label="sad">
      😰
    </span>
  </Banner>
);

const Winner = ({ gameover, winner, secretWord }) =>
  gameover && (
    <WinnerContainer>
      {winner === PLAYER2
        ? DisplayWinningText()
        : DisplayLosingText(secretWord)}
    </WinnerContainer>
  );

Winner.propTypes = {
  winner: PropTypes.string,
  gameover: PropTypes.bool.isRequired,
  secretWord: PropTypes.string.isRequired
};

export default Winner;
