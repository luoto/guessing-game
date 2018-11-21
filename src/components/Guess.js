import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Guess extends Component {
  onClickHandler = e => {
    const selectedLetter = e.target.textContent;
    this.props.onGuess(selectedLetter);
  };

  isUsed = letter => {
    const { correctlyGuessedLetters, incorrectlyGuessedLetters } = this.props;

    return (
      correctlyGuessedLetters.includes(letter) ||
      incorrectlyGuessedLetters.includes(letter)
    );
  };

  render() {
    const { letters } = this.props;

    return letters.map((letter, index) => {
      return (
        <button
          onClick={this.onClickHandler}
          key={letter}
          disabled={this.isUsed(letter)}
        >
          {letter}
        </button>
      );
    });
  }
}

Guess.propTypes = {
  onGuess: PropTypes.func.isRequired,
  letters: PropTypes.array.isRequired,
  incorrectlyGuessedLetters: PropTypes.array.isRequired,
  correctlyGuessedLetters: PropTypes.array.isRequired
};

export default Guess;
