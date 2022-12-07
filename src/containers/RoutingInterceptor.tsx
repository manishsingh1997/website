import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import isUndefined from 'lodash/isUndefined';

import AppLoader from '../components/common/AppLoader';
import { City } from '../components/AppCityPage/types';
import { CitiesJSONData } from '../components/HomePage/components/CitySearch/consts';
import { getCityPath, getExistingCitySlug, SupportedState } from '../components/HomePage/components/CitySearch/utils';

import { useLocationSearchOmit } from './utils';

type RoutingInterceptorProps = {
  children: ReactNode,
  isLoading?: boolean,
  redirectTo?: string,
}

const RoutingInterceptor = ({ children, isLoading, redirectTo }: RoutingInterceptorProps) => {
  if (isLoading) {
    return <AppLoader />;
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return <>{children}</>;
};

export const GeoTargetRoutingInterceptor = ({ children }: RoutingInterceptorProps) => {
  type GeoTargetCity = Pick<City, 'city' | 'state'>;

  const { pathname, search } = useLocation();
  const nonGeoSearch = useLocationSearchOmit(['utm_loc_interest_ms', 'utm_loc_physical_ms']);

  const [geoTargetCity, setGeoTargetCity] = useState<GeoTargetCity | null>();

  const params = useMemo(() => queryString.parse(search) as Record<string, string | undefined>, [search]);
  const geoTargetID = useMemo(() => params.utm_loc_interest_ms || params.utm_loc_physical_ms, [params]);

  const geoTargetCityPath = useMemo(() => {
    if (!geoTargetCity) return;

    try {
      const citySlug = getExistingCitySlug(
        geoTargetCity?.city,
        geoTargetCity?.state as SupportedState,
        CitiesJSONData,
      );
      if (!citySlug) return;
      return getCityPath(citySlug);
    } catch {
      // ignore
    }
  }, [geoTargetCity]);

  const redirectTo = useMemo(() => {
    if (!geoTargetID) return;

    return `${geoTargetCityPath ?? pathname}${nonGeoSearch}`;
  }, [geoTargetCityPath, geoTargetID, nonGeoSearch, pathname]);

  useEffect(function getGeoTargetCity() {
    if (!geoTargetID) return;

    import('../data/geotargets/cities-data.json')
      .then(geoTargetCities => {
        const city = geoTargetCities[geoTargetID] as GeoTargetCity;

        setGeoTargetCity(city ?? null);
      });
  }, [geoTargetID]);

  return (
    <RoutingInterceptor {...{ isLoading: !!geoTargetID && isUndefined(geoTargetCity), redirectTo }}>
      {children}
    </RoutingInterceptor>
  );
};
