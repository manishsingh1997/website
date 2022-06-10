import React from 'react';

import NotFoundPage from '../NotFoundPage';
import {City} from './types';

export type AppCityPageProps = {
  city: City,
};

const AppCityPage = (props: AppCityPageProps) => {
  const {city} = props;

  console.log(city); // eslint-disable-line

  // NOTE: it will be replaced with actual content in upcoming PRs
  return <NotFoundPage />;
};

export default AppCityPage;
