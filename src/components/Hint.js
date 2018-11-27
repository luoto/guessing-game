import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import api from '../helpers/api';

const HintWrapper = styled.div``;

const Definition = styled.div``;

const PartOfSpeech = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 2px;
  background: #f0f0f0;
`;

class Hint extends React.Component {
  state = {
    definition: {}
  };

  componentDidMount() {
    /*
     * Is an antipattern but is a workaround for now. This component tries to call setState due to async call to API
     * but the component is unmounted before it is completed, which produces a warning during tests.
     * ref: https://stackoverflow.com/questions/49906437/how-to-cancel-a-fetch-on-componentwillunmount
     */
    this.mounted = true;
    this.getDefinition(this.props.word);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.word !== this.props.word) {
      this.getDefinition(this.props.word);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getDefinition = async word => {
    let definition = await api.getDefinition(word);
    if (this.mounted) {
      this.setState({
        definition
      });
    }
  };

  displayDefinition = () => {
    const { definition } = this.state;
    return Object.keys(definition).map(key => {
      return (
        <div key={key}>
          <div>
            <PartOfSpeech>{key}</PartOfSpeech>
          </div>
          <ol>
            {definition[key].map((defObject, index) => (
              <li key={index}>
                <p>{defObject.definition}</p>
              </li>
            ))}
          </ol>
        </div>
      );
    });
  };

  render() {
    return (
      <HintWrapper>
        <h2>Hint</h2>
        <Definition>
          {this.state.definition ? (
            this.displayDefinition()
          ) : (
            <p>Sorry, can't give you any hints for this word...</p>
          )}
        </Definition>
      </HintWrapper>
    );
  }
}

Hint.propTypes = {
  word: PropTypes.string.isRequired
};

export default Hint;
