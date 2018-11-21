import React from 'react';
import PropTypes from 'prop-types';

const Health = ({ health }) =>
  Array(health)
    .fill(null)
    .map((_, index) => <div key={index}>*</div>);

Health.propTypes = {
  health: PropTypes.number.isRequired
};

export default Health;
