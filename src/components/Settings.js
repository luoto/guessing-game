import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SettingsWrapper = styled.div`
  label {
    display: block;
    margin-right: 16px;
  }

  select {
    margin-left: 16px;
    border: 1px solid #c0c0c0;
    border-radius: 2px;
    background: white;
  }

  button {
    float: right;
    border: 1px solid #c0c0c0;
    border-radius: 2px;
    background: none;
    cursor: pointer;

    &:hover {
      border: 1px solid #82c91e;
      background: #82c91e;
      color: white;
    }
  }
`;

class Settings extends React.Component {
  state = {
    difficulty: this.props.difficulty
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  save = () => {
    this.props.saveSettings(this.state.difficulty);
    this.props.toggleSettings();
  };

  render() {
    return (
      <SettingsWrapper>
        <h2>Settings</h2>
        <label>
          Difficulty:
          <select
            name="difficulty"
            value={this.state.difficulty}
            onChange={this.handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <button onClick={this.save}>Save</button>
      </SettingsWrapper>
    );
  }
}

Settings.propTypes = {
  difficulty: PropTypes.string,
  saveSettings: PropTypes.func,
  toggleSettings: PropTypes.func
};

export default Settings;
