import React from 'react';

import errorPage from '@ergeon/core-components/src/assets/error-page.svg';

import './index.scss';

class NotFoundPage extends React.Component {

  render() {
    return (
      <div className="not-found-page">
        <div className="not-found-page__img-container">
          <img src={errorPage}/>
        </div>
        <h2 className="center spacing before__is-12">Not Found</h2>
      </div>
    );
  }
}

export default NotFoundPage;
