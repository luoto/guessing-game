import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GuessedWordsWrapper = styled.div`
  margin: 16px 0;
`;

class GuessedWords extends React.Component {
  render() {
    return (
      <GuessedWordsWrapper>
        <h2>Guessed Words</h2>
        <ul>
          {this.props.words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </GuessedWordsWrapper>
    );
  }
}

GuessedWords.propTypes = {
  words: PropTypes.array.isRequired
};

export default GuessedWords;
