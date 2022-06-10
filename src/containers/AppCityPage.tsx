import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from 'react-router';

import AppLoader from '../components/common/AppLoader';
import AppCityPage from '../components/AppCityPage';
import {City} from '../components/AppCityPage/types';

const AppCityPageContainer = () => {
  const location = useLocation();
  const citySlug = useMemo(() => location.pathname.match(/[^\/]+\/?$/i)?.[0], [location.pathname]);

  const [city, setCity] = useState<City>();
  const [error, setError] = useState<Error>();

  useEffect(function loadCity() {
    import(`../data/cities/${citySlug}.json`)
      .then(module => setCity(module.default))
      .catch(setError);
  }, [citySlug]);

  if (error) {
    throw new Error(`Failed to import non-existing "data/city/${citySlug}.json"`);
  }

  if (!city) {
    return <AppLoader />;
  }
  return <AppCityPage city={city} />;
};

export default AppCityPageContainer;
