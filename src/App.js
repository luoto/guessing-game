import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import GameConfig from './components/GameConfig';
import Header from './components/Header';
import GuessingGame from './components/GuessingGame';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <GameConfig>{props => <GuessingGame {...props} />}</GameConfig>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
