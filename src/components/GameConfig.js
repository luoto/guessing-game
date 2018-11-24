import React, { Component } from 'react';
import styled from 'styled-components';

const GameConfigHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d3d3d3;
  margin-bottom: 32px;

  label {
    margin-right: 16px;
  }

  select {
    margin-left: 4px;
  }
`;

class Settings extends Component {
  state = {
    loading: true,
    settings: {
      difficulty: 'medium'
    }
  };

  componentDidMount() {
    this.setState({
      ...JSON.parse(localStorage.getItem('settings')),
      loading: false
    });
  }

  saveSettings = () => {
    localStorage.setItem(
      'settings',
      JSON.stringify({ ...this.state.settings })
    );
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      settings: { [name]: value }
    });
  };

  render() {
    return (
      <>
        <GameConfigHeader>
          <label>
            Difficulty
            <select
              name="difficulty"
              value={this.state.settings.difficulty}
              onChange={this.handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          <button onClick={this.saveSettings}>Save</button>
        </GameConfigHeader>
        {this.props.children(this.state)}
      </>
    );
  }
}

export default Settings;
