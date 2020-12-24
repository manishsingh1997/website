import React from 'react';
import {Helmet} from 'react-helmet';

import errorPage from '@ergeon/core-components/src/assets/error-page.svg';
import ErrorPage from '../common/ErrorPage';

const NotFoundPage = () => (
  <>
    <Helmet>
      <meta content="noindex" name="robots" />
    </Helmet>
    <ErrorPage image={errorPage} title="Not Found"></ErrorPage>
  </>
);

export default NotFoundPage;
