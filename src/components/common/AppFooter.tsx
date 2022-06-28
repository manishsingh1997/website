import React, {memo, useMemo} from 'react';
import {useLocation} from 'react-router';
import {SimpleFooter, LocationsFooter} from '@ergeon/core-components';
import {City} from '../AppCityPage/types';
import {formatFooterLicenses} from '../AppCityPage/utils';
import {CA_URL_LICENSE} from '../AppCityPage/constants';

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
          <SimpleFooter
            {...footerProps}
            licenses={[
              {
                name: 'License #: C13 Fencing license',
                url: CA_URL_LICENSE,
              },
            ]}
          />
          <LocationsFooter listArray={locationsList} listTitle="Locations" />
        </>
      );
    case FooterView.Cities:
      return (
        <SimpleFooter
          {...footerProps}
          address={city?.address}
          licenses={formatFooterLicenses(city?.licenses, city?.license?.url)}
          phoneNumber={city?.phone}
        />
      );
    default:
      return <SimpleFooter {...footerProps} />;
  }
};

export default memo(AppFooter);
