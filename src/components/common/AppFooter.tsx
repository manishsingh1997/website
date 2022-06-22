import React, {memo, useMemo} from 'react';
import {useLocation} from 'react-router';
import {SimpleFooter, LocationsFooter} from '@ergeon/core-components';
import {City} from '../AppCityPage/types';

type LocationsList = {
  text: string;
  url: string;
};

type AppFooterProps = {
  city?: City;
  ergeonUrl: string;
  fencequotingUrl: string;
  locationsList: LocationsList[];
  productCatalogUrl: string;
  projectsGalleryUrl: string;
  widthClass: string;
};

enum FooterView {
  Home,
  Cities,
  Default,
}

const AppFooter = ({city, locationsList, ...footerProps}: AppFooterProps) => {
  const location = useLocation();

  const urlMatch = useMemo(() => {
    if (location.pathname.match(/^\/$/)) {
      return FooterView.Home;
    } else if (location.pathname.match(/\/fences\/cities\//i)) {
      return FooterView.Cities;
    }
    return FooterView.Default;
  }, [location.pathname]);

  switch (urlMatch) {
    case FooterView.Home:
      return (
        <>
          <SimpleFooter {...footerProps} licenses={['C13 Fencing license']} />
          <LocationsFooter listArray={locationsList} listTitle="Locations" />
        </>
      );
    case FooterView.Cities:
      return (
        <SimpleFooter {...footerProps} address={city?.address} licenses={city?.licenses} phoneNumber={city?.phone} />
      );
    default:
      return <SimpleFooter {...footerProps} />;
  }
};

export default memo(AppFooter);
