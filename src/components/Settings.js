import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SettingsWrapper = styled.div`
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
  };

  render() {
    return (
      <SettingsWrapper>
        <label>
          Difficulty
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
  saveSettings: PropTypes.func
};

export default Settings;
