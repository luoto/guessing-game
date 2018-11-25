import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Guess from './Guess';
import Health from './Health';
import SecretWord from './SecretWord';
import countDistinctLetters from '../helpers/countDistinctLetters';
import letters from '../constants/letters';
import api from '../helpers/api';
import Leaderboard from './Leaderboard';
import GuessedWords from './GuessedWords';
import Rules from './Rules';
import Winner from './Winner';

const PLAYER1 = 'Secret Keeper';
const PLAYER2 = 'Guesser';

const GuessingGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
`;

class GuessingGame extends Component {
  state = {
    totalHealth: 6,
    currentHealth: 6,
    secretWord: '',
    revealedLetters: [],
    letters,
    correctlyGuessedLetters: [],
    incorrectlyGuessedLetters: [],
    guessedWords: [],
    gameover: false,
    winner: null
  };

  componentDidMount() {
    this.getSecretWord();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.settings.difficulty !== this.props.settings.difficulty) {
      this.resetGame();
    }
  }

  async getSecretWord() {
    const secretWord = await api.getWord({ difficulty: this.props.difficulty });
    this.setState({
      secretWord
    });
  }

  resetGame = () => {
    this.getSecretWord();
    this.setState({
      currentHealth: 6,
      revealedLetters: [],
      correctlyGuessedLetters: [],
      incorrectlyGuessedLetters: [],
      guessedWords: [],
      gameover: false,
      winner: null
    });
  };

  onGuess = guess => {
    const { gameover } = this.state;

    if (!gameover) {
      if (guess.length === 1) {
        this.state.secretWord.includes(guess)
          ? this.guessCorrect(guess)
          : this.guessIncorrect(guess);
      } else {
        this.state.guessedWords.push(guess);
        this.setState({ guessedWords: this.state.guessedWords });
        this.state.secretWord === guess
          ? this.revealWinner(guess)
          : this.decreaseHealth();
      }
    }
  };

  revealWinner(guess) {
    this.setState({
      winner: PLAYER2,
      gameover: true,
      revealedLetters: [...this.state.revealedLetters, ...guess]
    });
  }

  decreaseHealth() {
    this.setState(state => {
      let newState = {
        currentHealth: state.currentHealth - 1
      };

      if (state.currentHealth === 1) {
        newState.gameover = true;
        newState.winner = PLAYER1;
      }

      return newState;
    });
  }

  guessIncorrect = guess => {
    const { incorrectlyGuessedLetters } = this.state;

    this.setState(state => {
      let newState = {
        incorrectlyGuessedLetters: [...incorrectlyGuessedLetters, guess],
        currentHealth: state.currentHealth - 1
      };

      if (state.currentHealth === 1) {
        newState.gameover = true;
        newState.winner = PLAYER1;
      }

      return newState;
    });
  };

  guessCorrect = guess => {
    const { secretWord } = this.state;

    this.setState(state => {
      let newState = {
        correctlyGuessedLetters: [...state.correctlyGuessedLetters, guess],
        revealedLetters: [...state.revealedLetters, guess]
      };

      if (
        state.revealedLetters.length + 1 ===
        countDistinctLetters(secretWord)
      ) {
        newState.gameover = true;
        newState.winner = PLAYER2;
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
          playerwin={gameover && winner === PLAYER2}
          difficulty={difficulty}
          score={currentHealth}
        />
      </GuessingGameWrapper>
    );
  }
}

GuessingGame.propTypes = {
  settings: PropTypes.shape({
    difficulty: PropTypes.string
  })
};

export default GuessingGame;
