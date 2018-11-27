import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import letters from '../constants/letters';
import stopPropagation from '../helpers/stopPropagation';

const GuessWrapper = styled.div`
  width: 100%;
  margin: 16px;
  text-align: center;

  div {
    display: inline-block;
  }

  input {
    height: 26px;
    padding: 1px 8px 2px 8px;
    border: 1px solid #e0e0e0;
  }

  button {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 4px;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    background: white;
    cursor: pointer;

    @media (max-width: 545px) {
      margin: 1px;
      width: 30px;
      height: 30px;
    }

    @media (max-width: 375px) {
      margin: 1px;
      width: 29px;
      height: 29px;
    }
  }

  .correct {
    border: 1px solid #82c91e;
    color: #82c91e;
  }

  .incorrect {
    border: 1px solid red;
    color: red;
  }
`;

const FullGuess = styled.div`
  margin: 8px;
`;

const ButtonRow = styled.div``;

const Info = styled.div`
  width: 100%;
  margin: 16px 0;
  padding: 8px;
  background: darkgrey;
  color: white;
`;

const Key = styled.span`
  display: inline-block;
  border: 2px solid white;
  padding: 2px 4px;
  font-size: 0.8rem;
  font-family: mono;
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
        id={letter}
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
      <ButtonRow key={`${rowOfLetters}-${index}`}>
        {rowOfLetters.map(letter => renderLetterButton(letter))}
      </ButtonRow>
    );

    return (
      <GuessWrapper>
        <FullGuess>
          <input
            name="guess"
            onKeyDown={stopPropagation}
            onChange={this.handleChange}
            value={this.state.guess}
            placeholder="Enter a word..."
          />

          <button
            data-test="submit-word"
            style={{ width: 'auto' }}
            onClick={this.makeFullWordGuess}
          >
            guess
          </button>
        </FullGuess>
        {this.getKeyboardRows().map(renderRows)}
        <Info>
          <i className="fas fa-info-circle" /> Press <Key>letter</Key> or click
          a button to make a guess
        </Info>
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
