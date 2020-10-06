import React from 'react';

import errorPage from '@ergeon/core-components/src/assets/error-page.svg';
import ErrorPage from '../common/ErrorPage';

const NotFoundPage = () => (
  <ErrorPage image={errorPage} title="Not Found"></ErrorPage>
);

export default NotFoundPage;
