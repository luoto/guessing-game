import React from 'react';
import styled from 'styled-components';

const RulesWrapper = styled.div`
  li {
    margin-bottom: 16px;
  }
`;

class Rules extends React.Component {
  render() {
    return (
      <RulesWrapper>
        <h2>Rules</h2>
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
            The guesser may guess the full word instead of just letters one at a
            time, and it will count those against the guesses total
          </li>
          <li>
            The guesser wins the game if they guess all letters in the secret
            word correctly and have not lost the game
          </li>
        </ol>
      </RulesWrapper>
    );
  }
}

export default Rules;
