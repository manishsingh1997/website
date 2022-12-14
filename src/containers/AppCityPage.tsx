import React, {useCallback, useEffect, useMemo} from 'react';

import {ThunkActionDispatch} from 'redux-thunk';

import {useLocation, useHistory} from 'react-router';
import {connect} from 'react-redux';

import AppLoader from '../components/common/AppLoader';
import AppCityPage from '../components/AppCityPage';
import {City} from '../components/AppCityPage/types';
import {getCity, resetCity} from '../flux/actions/city';
import {Action} from '../flux/store';
import {CityDispatcher} from '../flux/actions/types';
import {CityReducerState} from '../flux/reducers/city';

type AppCityPageContainerProps = {
  city: City | null;
  isLoading: boolean;
  error: Error | null;
  getCity: (cityName: string) => void;
  resetCity: () => void;
};

type CityPageStateProps = {
  city: CityReducerState;
};

const AppCityPageContainer = (props: AppCityPageContainerProps) => {
  const history = useHistory();
  const location = useLocation();
  const citySlug = useMemo(() => location.pathname.match(/([^\/]+)\/?$/i)?.[1], [location.pathname]);

  const {city, error, isLoading, getCity, resetCity} = props;

  useEffect(function loadCity() {
    // License in DC is not yet verified,
    // So we need to hide the page(ENG-18124)
    if (location.pathname?.includes('washington')) {
      return goToFencesPage()
    }
    if (citySlug) {
      getCity(citySlug);
    }
  }, [citySlug]);

  useEffect(function onUnload() {
    return () => resetCity();
  }, []);

  const goToFencesPage = useCallback(() => {
    history.push('/fences');
  }, [history]);

  if (error) {
    throw new Error(`Failed to import non-existing "data/city/${citySlug}.json"`);
  }

  if (isLoading || !city) {
    return <AppLoader />;
  }
  return <AppCityPage city={city} />;
};

const mapStateToProps = ({city: cityState}: CityPageStateProps) => {
  return {
    city: cityState.data,
    error: cityState.error,
    isLoading: cityState.isLoading,
  };
};

const mapDispatchToProps = (
  dispatch: (action: ThunkActionDispatch<Action<CityDispatcher>>) => void
) => {
  return {
    resetCity: () => {
      dispatch(resetCity());
    },
    getCity: (cityName: string) => {
      dispatch(getCity(cityName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppCityPageContainer);
