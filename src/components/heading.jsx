import React from 'react';
import PropTypes from 'prop-types';

import './heading.scss';
export default function Heading({title, subtitle}) {
  return (
    <React.Fragment>
      <h1 className="heading">{title}</h1>
      {subtitle && <p className="heading__subtitle">{subtitle}</p>}
    </React.Fragment>
  );
}

Heading.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};