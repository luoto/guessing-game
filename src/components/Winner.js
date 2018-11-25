import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WinnerContainer = styled.div`
  padding: 32px;
  width: 500px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  span {
    margin-left: 8px;
  }
`;

const Winner = ({ gameover, winner }) =>
  gameover && (
    <WinnerContainer>
      <h3>
        We have a Winner!
        <span role="img" aria-label="cheers!">
          🎉
        </span>
      </h3>
      <p>{winner}</p>
    </WinnerContainer>
  );

Winner.propTypes = {
  winner: PropTypes.string,
  gameover: PropTypes.bool
};

export default Winner;
