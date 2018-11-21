import React from 'react';
import PropTypes from 'prop-types';

const SecretWord = ({ secretWord, revealedLetters }) =>
  Array.from(secretWord).map((letter, index) => (
    <div key={index} letter={letter}>
      {revealedLetters.includes(letter) ? letter : '_'}
    </div>
  ));

SecretWord.propTypes = {
  secretWord: PropTypes.string.isRequired,
  revealedLetters: PropTypes.array.isRequired
};

export default SecretWord;
