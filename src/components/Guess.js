import React, { Component } from 'react';
import PropTypes from 'prop-types';
import letters from '../constants/letters';

class Guess extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDownHandler);
  }

  componentWillMount() {
    window.removeEventListener('keydown', this.onKeyDownHandler);
  }

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

  onKeyDownHandler = e => {
    const { key } = e;

    if (!this.isUsed(key) && letters.includes(key)) {
      this.props.onGuess(key);
    }
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
