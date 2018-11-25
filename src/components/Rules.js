import React from 'react';

class Rules extends React.Component {
  render() {
    return (
      <div>
        <h2>Game Rules</h2>
        <ol>
          <li>
            At the start of the game, the computer/secret-keeper will choose a
            dictionary word
          </li>
          <li>
            The guesser loses the game if they guess 6 letters that are not in
            the secret word
          </li>
          <li>
            THe guesser may guess the full word instead of just letters one at a
            time, and it will count those against the guesses total
          </li>
          <li>
            The guesser wins the game if they guess all letters in the secret
            word correctly and have not lost the game
          </li>
        </ol>
      </div>
    );
  }
}

export default Rules;
