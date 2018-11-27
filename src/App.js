import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import GuessingGame from './components/GuessingGame';
import GameConfig from './components/GameConfig';

class App extends Component {
  render() {
    return (
      <div>
        <GameConfig>{props => <GuessingGame {...props} />}</GameConfig>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
