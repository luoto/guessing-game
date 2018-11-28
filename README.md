# Guess!

A guessing game which can be played by a user against the computer. This is a game where the secret-keeper thinks of a word, and the guesser tries to guess it one letter at a time. The guesser has six guesses. If the guesser guesses a letter which is part of the word, the secret-keeper will reveal all occurences of that letter in the word. If the guesser guesses a correct letter such that all letters are revealed, the game is over and player 2 has one. Instead of player 2 runs out of guesses before the whole word is discovered, the game is over and player 1 has won.

The words can be very challenging, so don't feel bad if you lose.

Enjoy 👍

[Demo](http://luoto.github.io/guessing-game)

## Getting Started

```
git clone https://github.com/luoto/guessing-game.git
cd guessing-game
npm install
npm start
```

## Features

- Difficulty levels
- Hints (words can be tough)
- Leaderboard (local support only)
- Support for guessing full words instead of just letters one at a time
- Responsive UI

## FAQ

This app uses [CORS Anywhere](https://github.com/meetDeveloper/googleDictionaryAPI) proxy to bypass CORS restrictions and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

App was only tested on Chrome/Android.
