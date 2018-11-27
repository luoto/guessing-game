import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import api from '../helpers/api';

const HintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 100px;
  }
`;

const Definition = styled.div`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

class Hint extends React.Component {
  state = {
    visible: false,
    definition: {}
  };

  componentDidMount() {
    this.getDefinition(this.props.word);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.word !== this.props.word) {
      this.getDefinition(this.props.word);
    }
  }

  getDefinition = async word => {
    let definition = await api.getDefinition(word);
    this.setState({
      definition
    });
  };

  showHint = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    return (
      <HintWrapper>
        <button onClick={this.showHint}>Show Hint</button>
        <Definition visible={this.state.visible}>
          <pre>{JSON.stringify(this.state.definition)}</pre>
        </Definition>
      </HintWrapper>
    );
  }
}

Hint.propTypes = {
  word: PropTypes.string.isRequired
};

export default Hint;
