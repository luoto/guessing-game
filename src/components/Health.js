import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HealthWrapper = styled.div`
  margin: 16px;
  min-height: 32px;

  div {
    display: inline-block;
    margin-left: 8px;
    width: 32px;
    height: 32px;
  }

  .fa-heart {
    color: red;
  }
`;

const Health = ({ totalHealth, currentHealth }) => {
  return (
    <HealthWrapper>
      {Array(currentHealth)
        .fill(null)
        .map((_, index) => (
          <div key={index}>
            <i className="fas fa-heart fa-2x" />
          </div>
        ))}
      {Array(totalHealth - currentHealth)
        .fill(null)
        .map((_, index) => (
          <div key={index}>
            <i className="far fa-heart fa-2x" />
          </div>
        ))}
    </HealthWrapper>
  );
};

Health.propTypes = {
  currentHealth: PropTypes.number.isRequired,
  totalHealth: PropTypes.number.isRequired
};

export default Health;
