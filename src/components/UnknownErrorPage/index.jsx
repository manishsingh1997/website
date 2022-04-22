import React from 'react';

import whaleIcon from '@ergeon/core-components/src/assets/whale.svg';
import ErrorPage from '../common/ErrorPage';

const UnknownErrorPage = () => (
  <ErrorPage
    description="We are already notified about this. Please try to refresh the page."
    image={whaleIcon}
    title="Oops, something unexpected happened"
  ></ErrorPage>
);

export default UnknownErrorPage;
