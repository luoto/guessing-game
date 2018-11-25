import React, { Component } from 'react';
import PropTypes from 'prop-types';
import letters from '../constants/letters';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const GuessWrapper = styled.div`
  margin: 16px;
  width: 400px;
  text-align: center;

  div {
    display: inline-block;
  }

  button {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 4px;
    background: white;
    border-radius: 2px;
  }

  .correct {
    border: 1px solid #7ec0ee;
  }

  .incorrect {
    border: 1px solid red;
  }
`;

class Guess extends Component {
  state = {
    guess: ''
  };

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

  stopPropagation = e => {
    e.stopPropagation();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  makeFullWordGuess = () => {
    const { guess } = this.state;
    if (guess.length > 0) {
      this.props.onGuess(guess);
      this.setState({ guess: '' });
    } else {
      toast(<div>No word was entered</div>, {
        type: toast.TYPE.ERROR
      });
    }
  };

  getKeyboardRows = () => {
    const rowEndings = 'pl';
    let rows = [];
    let row = 0;

    letters.forEach(letter => {
      if (!rows[row]) {
        rows.push([]);
      }

      rows[row].push(letter);

      if (rowEndings.includes(letter)) {
        row += 1;
      }
    });

    return rows;
  };

  render() {
    const renderLetterButton = letter => (
      <button
        onClick={this.onClickHandler}
        key={letter}
        disabled={this.isUsed(letter)}
        className={
          (this.props.incorrectlyGuessedLetters.includes(letter) &&
            'incorrect') ||
          (this.props.correctlyGuessedLetters.includes(letter) && 'correct') ||
          undefined
        }
      >
        {letter}
      </button>
    );

    const renderRows = (rowOfLetters, index) => (
      <div key={`${rowOfLetters}-${index}`}>
        {rowOfLetters.map(letter => renderLetterButton(letter))}
      </div>
    );

    return (
      <GuessWrapper>
        <div>
          <input
            name="guess"
            onKeyDown={this.stopPropagation}
            onChange={this.handleChange}
            value={this.state.guess}
            placeholder="Enter a word..."
          />

          <button style={{ width: 'auto' }} onClick={this.makeFullWordGuess}>
            guess
          </button>
        </div>
        {this.getKeyboardRows().map(renderRows)}
      </GuessWrapper>
    );
  }
}

Guess.propTypes = {
  onGuess: PropTypes.func.isRequired,
  letters: PropTypes.array.isRequired,
  incorrectlyGuessedLetters: PropTypes.array.isRequired,
  correctlyGuessedLetters: PropTypes.array.isRequired
};

export default Guess;
