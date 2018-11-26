import React from 'react';

const DEFAULT_DIFFICULTY = 'medium';

class GameConfig extends React.Component {
  state = {
    loading: true,
    difficulty: DEFAULT_DIFFICULTY
  };

  componentDidMount() {
    this.setState({
      difficulty: localStorage.getItem('difficulty') || DEFAULT_DIFFICULTY,
      loading: false
    });
  }

  saveSettings = difficulty => {
    localStorage.setItem('difficulty', difficulty);

    this.setState({
      difficulty
    });
  };

  render() {
    return this.props.children({
      ...this.state,
      saveSettings: this.saveSettings
    });
  }
}

export default GameConfig;
