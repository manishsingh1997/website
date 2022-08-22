import React from 'react';

import PropTypes from 'prop-types';

const Success = ({header, text}) => (
  <>
    <h1>{header}</h1>
    <p>{text}</p>
  </>
);
Success.propTypes = {
  header: PropTypes.string,
  scrollOnMount: PropTypes.bool,
  text: PropTypes.string,
};

export default Success;
