import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import hintIcon from '../assets/icons/icons8-hint.png';
import leaderboardIcon from '../assets/icons/icons8-leaderboard.png';
import resetIcon from '../assets/icons/icons8-reset.png';
import rulesIcon from '../assets/icons/icons8-rules.png';
import settingsIcon from '../assets/icons/icons8-settings.png';

const NavWrapper = styled.div`
  padding-top: 24px;

  @media (max-width: 545px) {
    padding: 16px;
  }

  ul {
    padding: 0;
    list-style: none;
    text-align: center;

    @media (max-width: 545px) {
      margin: 0;
    }
  }

  li {
    display: inline-block;
    margin-bottom: 32px;

    @media (max-width: 545px) {
      margin-bottom: 0;
      margin-right: 16px;
    }
  }

  img {
    width: 32px;
    height: 32px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    background: #f6f8fa;
    cursor: pointer;

    &:hover {
      background: #c3c3c3;
    }
  }
`;

class Nav extends React.Component {
  render() {
    const { toggle, resetGame } = this.props;

    return (
      <NavWrapper>
        <ul>
          <li>
            <button onClick={() => toggle('rules')} aria-label="rules">
              <img src={rulesIcon} alt="rules icon" />
            </button>
          </li>
          <li>
            <button onClick={() => toggle('hint')} aria-label="settings">
              <img src={hintIcon} alt="hint icon" />
            </button>
          </li>
          <li>
            <button
              onClick={() => toggle('leaderboard')}
              aria-label="leaderboard"
            >
              <img src={leaderboardIcon} alt="leaderbord icon" />
            </button>
          </li>

          <li>
            <button onClick={resetGame} aria-label="reset game">
              <img src={resetIcon} alt="reset icon" />
            </button>
          </li>
          <li>
            <button onClick={() => toggle('settings')} aria-label="settings">
              <img src={settingsIcon} alt="settings icon" />
            </button>
          </li>
        </ul>
      </NavWrapper>
    );
  }
}

Nav.propTypes = {
  resetGame: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Nav;
