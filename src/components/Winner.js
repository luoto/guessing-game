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

const DisplayLosingText = () => (
  <Banner>
    Better luck next time
    <span role="img" aria-label="sad">
      😰
    </span>
  </Banner>
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
