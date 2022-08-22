import React from 'react';

import PropTypes from 'prop-types';

import './ErrorPage.scss';

const ErrorPage = ({title, image, description}) => {
  return (
    <div className="error-page">
      <div className="error-page__img-container">
        <img src={image} />
      </div>
      <h2 className="center spacing before__is-12">{title}</h2>
      <p className="center spacing before__is-12">{description}</p>
    </div>
  );
};

ErrorPage.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
};

export default ErrorPage;
