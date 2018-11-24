import React, { Component } from 'react';
import 'normalize.css';
import GuessingGame from './components/GuessingGame';
import GameConfig from './components/GameConfig';

class App extends Component {
  render() {
    return <GameConfig>{props => <GuessingGame {...props} />}</GameConfig>;
  }
}

export default App;
