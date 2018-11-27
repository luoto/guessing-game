import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GuessedWordsWrapper = styled.div`
  width: 100%;
  margin: 16px 0;
  padding: 0 16px 16px 16px;
  border-radius: 5px;
  box-shadow: -2px 2px 4px 3px rgba(0, 0, 0, 0.04),
    2px 2px 3px rgba(0, 0, 0, 0.024);
  text-align: center;

  @media (max-width: 545px) {
    box-shadow: none;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    height: 40px;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
    height: 16px;
    margin-left: 8px;
  }
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
