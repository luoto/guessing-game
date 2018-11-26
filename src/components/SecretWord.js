import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SecretWordWrapper = styled.div`
  margin: 16px;

  div {
    display: inline-block;
    margin-left: 8px;
  }
`;

const SecretWord = ({ secretWord, revealedLetters }) => (
  <SecretWordWrapper>
    {secretWord ? (
      Array.from(secretWord).map((letter, index) => (
        <div key={index} data-test="letter">
          {revealedLetters.includes(letter) ? letter : '_'}
        </div>
      ))
    ) : (
      <div>Getting secret word...</div>
    )}
  </SecretWordWrapper>
);

SecretWord.propTypes = {
  secretWord: PropTypes.string.isRequired,
  revealedLetters: PropTypes.array.isRequired
};

export default SecretWord;
