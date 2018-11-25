import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import api from '../helpers/api';
import countDistinctLetters from '../helpers/countDistinctLetters';

import letters from '../constants/letters';

import Rules from './Rules';
import Health from './Health';
import SecretWord from './SecretWord';
import Guess from './Guess';
import GuessedWords from './GuessedWords';
import Winner from './Winner';
import Leaderboard from './Leaderboard';

const PLAYER1 = 'Secret Keeper';
const PLAYER2 = 'Guesser';
const STARTING_HEALTH = 6;

const initialState = {
  totalHealth: STARTING_HEALTH,
  currentHealth: STARTING_HEALTH,
  secretWord: '',
  revealedLetters: [],
  correctlyGuessedLetters: [],
  incorrectlyGuessedLetters: [],
  guessedWords: [],
  gameover: false,
  winner: null
};

const GuessingGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
`;

class GuessingGame extends Component {
  state = initialState;

  componentDidMount() {
    this.getSecretWord();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.difficulty !== this.props.settings.difficulty) {
      this.resetGame();
    }
  }

  getSecretWord = async () => {
    const secretWord = await api.getWord({ difficulty: this.props.difficulty });
    this.setState({
      secretWord
    });
  };

  resetGame = () => {
    this.getSecretWord();
    this.setState(initialState);
  };

  onGuess = guess => {
    const { gameover, secretWord } = this.state;

    if (gameover) {
      return;
    }

    const guessedLetter = guess.length === 1 && secretWord.includes(guess);
    const guessedWord = secretWord === guess;

    guessedLetter || guessedWord ? this.correct(guess) : this.incorrect(guess);
  };

  correct = guess => {
    const { secretWord } = this.state;

    this.setState(state => {
      let newState = {};

      const guessedLetter = guess.length === 1;
      if (guessedLetter) {
        newState.correctlyGuessedLetters = [
          ...state.correctlyGuessedLetters,
          guess
        ];
        newState.revealedLetters = [...state.revealedLetters, guess];
      }

      const revealedAllLetters =
        state.revealedLetters.length + 1 === countDistinctLetters(secretWord);
      if (revealedAllLetters || guess === secretWord) {
        newState.gameover = true;
        newState.winner = PLAYER2;
        newState.revealedLetters = [...this.state.revealedLetters, ...guess];
      }

      return newState;
    });
  };

  incorrect = guess => {
    const { incorrectlyGuessedLetters } = this.state;

    this.setState(state => {
      let newState = { currentHealth: state.currentHealth - 1 };

      const guessedLetter = guess.length === 1;
      if (guessedLetter) {
        newState.incorrectlyGuessedLetters = [
          ...incorrectlyGuessedLetters,
          guess
        ];
      } else {
        newState.guessedWords = [...state.guessedWords, guess];
      }

      const outOfHealth = state.currentHealth === 1;
      if (outOfHealth) {
        newState.gameover = true;
        newState.winner = PLAYER1;
      }

      return newState;
    });
  };

  render() {
    const { difficulty } = this.props.settings;

    const {
      totalHealth,
      currentHealth,
      secretWord,
      revealedLetters,
      correctlyGuessedLetters,
      incorrectlyGuessedLetters,
      guessedWords,
      winner,
      gameover
    } = this.state;

    const playerwin = gameover && winner === PLAYER2;

    return (
      <GuessingGameWrapper className="App">
        <Rules />
        <Health totalHealth={totalHealth} currentHealth={currentHealth} />
        <SecretWord secretWord={secretWord} revealedLetters={revealedLetters} />
        <Guess
          onGuess={this.onGuess}
          letters={letters}
          correctlyGuessedLetters={correctlyGuessedLetters}
          incorrectlyGuessedLetters={incorrectlyGuessedLetters}
        />
        <button onClick={this.resetGame}>Reset Game</button>
        <GuessedWords words={guessedWords} />
        <Winner gameover={gameover} winner={winner} />
        <Leaderboard
          playerwin={playerwin}
          difficulty={difficulty}
          score={currentHealth}
        />
      </GuessingGameWrapper>
    );
  }
}

GuessingGame.propTypes = {
  settings: PropTypes.shape({
    difficulty: PropTypes.string.isRequired
  })
};

export default GuessingGame;
