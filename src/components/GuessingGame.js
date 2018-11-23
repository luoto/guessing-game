import React, { Component } from 'react';
import styled from 'styled-components';
import Guess from './Guess';
import Health from './Health';
import SecretWord from './SecretWord';
import countDistinctLetters from '../helpers/countDistinctLetters';
import letters from '../constants/letters';
import api from '../helpers/api';

const GuessingGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
`;

class GuessingGame extends Component {
  state = {
    health: 6,
    secretWord: '',
    revealedLetters: [],
    letters,
    correctlyGuessedLetters: [],
    incorrectlyGuessedLetters: [],
    gameover: false,
    winner: null
  };

  async componentDidMount() {
    const secretWords = await api.getWords();
    const randomIndex = Math.floor(Math.random() * secretWords.length);
    this.setState({
      secretWord: secretWords[randomIndex]
    });
  }

  onGuess = guess => {
    const { gameover } = this.state;

    if (!gameover) {
      if (guess.length === 1) {
        this.state.secretWord.includes(guess)
          ? this.guessCorrect(guess)
          : this.guessIncorrect(guess);
      } else {
        this.state.secretWord === guess
          ? this.revealWinner(guess)
          : this.decreaseHealth();
      }
    }
  };

  revealWinner(guess) {
    this.setState({
      winner: 'Guesser',
      gameover: true,
      revealedLetters: [...this.state.revealedLetters, ...guess]
    });
  }

  decreaseHealth() {
    this.setState(state => {
      let newState = {
        health: state.health - 1
      };

      if (state.health === 1) {
        newState.gameover = true;
        newState.winner = 'Secret Keeper';
      }
    });
  }

  guessIncorrect = guess => {
    const { incorrectlyGuessedLetters } = this.state;

    this.setState(state => {
      let newState = {
        incorrectlyGuessedLetters: [...incorrectlyGuessedLetters, guess],
        health: state.health - 1
      };

      if (state.health === 1) {
        newState.gameover = true;
        newState.winner = 'Score Keeper';
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
        newState.winner = 'Guesser';
      }

      return newState;
    });
  };

  render() {
    return (
      <GuessingGameWrapper className="App">
        <Health health={this.state.health} />
        {this.state.secretWord ? (
          <SecretWord
            secretWord={this.state.secretWord}
            revealedLetters={this.state.revealedLetters}
          />
        ) : (
          <div>Getting secretword ...</div>
        )}

        <Guess
          onGuess={this.onGuess}
          letters={this.state.letters}
          correctlyGuessedLetters={this.state.correctlyGuessedLetters}
          incorrectlyGuessedLetters={this.state.incorrectlyGuessedLetters}
        />
        {this.state.gameover && <div>Winner: {this.state.winner}</div>}
      </GuessingGameWrapper>
    );
  }
}

export default GuessingGame;
