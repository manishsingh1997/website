import React from 'react';

import {Helmet} from 'react-helmet';

import ErrorPage from '../common/ErrorPage';

import {getPageNotFoundImage} from './utils';

const NotFoundPage = () => (
  <>
    <Helmet>
      <meta content="noindex" name="robots" />
    </Helmet>
    <ErrorPage image={getPageNotFoundImage()} title="Page Not Found"/>
  </>
);

export default NotFoundPage;
