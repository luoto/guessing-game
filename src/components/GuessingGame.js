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
import Hint from './Hint';
import Modal from './Modal';
import Settings from './Settings';
import Nav from './Nav';

export const PLAYER1 = 'Secret Keeper';
export const PLAYER2 = 'Guesser';
const STARTING_HEALTH = 6;

export const initialState = {
  totalHealth: STARTING_HEALTH,
  currentHealth: STARTING_HEALTH,
  secretWord: '',
  revealedLetters: [],
  correctlyGuessedLetters: [],
  incorrectlyGuessedLetters: [],
  guessedWords: [],
  gameover: false,
  winner: null,
  leaderboard: false,
  hint: false,
  rules: false,
  settings: false
};

const GuessingGameWrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 80px;
  height: calc(100vh - 85px);

  @media (max-width: 545px) {
    grid-template-columns: 1fr;
  }
`;

const NavWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / span 5;
  border-left: 1px solid #f0f0f0;
  box-shadow: -2px 4px 4px rgba(0, 0, 0, 0.04);

  @media (max-width: 545px) {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04);
  }
`;

const MainWrapper = styled.div`
  display: grid;
  max-width: 500px;
  padding: 32px;
  justify-items: center;
`;

class GuessingGame extends Component {
  state = initialState;

  componentDidMount() {
    /*
     * Is an antipattern but is a workaround for now. This component tries to call setState due to async call to API
     * but the component is unmounted before it is completed, which produces a warning during tests.
     * ref: https://stackoverflow.com/questions/49906437/how-to-cancel-a-fetch-on-componentwillunmount
     */
    this.mounted = true;
    this.getSecretWord();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.difficulty !== this.props.difficulty) {
      this.resetGame();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getSecretWord = async () => {
    let secretWord = '';
    while (!secretWord) {
      secretWord = await api.getWord({ difficulty: this.props.difficulty });
    }

    if (this.mounted) {
      this.setState({
        secretWord
      });
    }
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
        newState.leaderboard = true;
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
        newState.leaderboard = true;
      }

      return newState;
    });
  };

  toggle = name => {
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };

  render() {
    const { difficulty } = this.props;

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
      <GuessingGameWrapper>
        <NavWrapper>
          <Nav resetGame={this.resetGame} toggle={this.toggle} />
        </NavWrapper>
        <MainWrapper>
          <Health totalHealth={totalHealth} currentHealth={currentHealth} />
          <GuessedWords words={guessedWords} />
          <SecretWord
            secretWord={secretWord}
            revealedLetters={revealedLetters}
          />

          <Guess
            onGuess={this.onGuess}
            letters={letters}
            correctlyGuessedLetters={correctlyGuessedLetters}
            incorrectlyGuessedLetters={incorrectlyGuessedLetters}
          />

          <Modal isOpen={this.state.rules} close={() => this.toggle('rules')}>
            <Rules />
          </Modal>

          <Modal
            isOpen={this.state.leaderboard}
            close={() => this.toggle('leaderboard')}
          >
            <Winner
              gameover={gameover}
              winner={winner}
              secretWord={secretWord}
            />
            <Leaderboard
              playerwin={playerwin}
              difficulty={difficulty}
              score={currentHealth}
            />
          </Modal>

          <Modal isOpen={this.state.hint} close={() => this.toggle('hint')}>
            <Hint word={secretWord} />
          </Modal>

          <Modal
            isOpen={this.state.settings}
            close={() => this.toggle('settings')}
          >
            <Settings
              difficulty={this.props.difficulty}
              saveSettings={this.props.saveSettings}
              toggleSettings={() => this.toggle('settings')}
            />
          </Modal>
        </MainWrapper>
      </GuessingGameWrapper>
    );
  }
}

GuessingGame.propTypes = {
  difficulty: PropTypes.string.isRequired
};

export default GuessingGame;
