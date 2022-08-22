import React, {memo, useMemo} from 'react';

import {useLocation} from 'react-router';
import {SimpleFooter, LocationsFooter} from '@ergeon/core-components';

import {City} from '../AppCityPage/types';
import {formatFooterLicenses, makePhoneLink} from '../AppCityPage/utils';
import {CA_LICENSE_URL, GA_LICENSE_URL} from '../AppCityPage/constants';

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

  const phoneLink = useMemo(() => {
    if (!city?.phone) return '';
    return (
      <a className="LicenseWithLink" data-track-call="true" href={makePhoneLink(city.phone)}>
        {city.phone}
      </a>
    )
  }, [city]);

  switch (urlMatch) {
    case FooterView.Home:
      return (
        <>
          <SimpleFooter
            {...footerProps}
            licenses={[
              {
                name: 'License #: 1040925, C13-Fencing, C27-Landscaping, C8-Concrete',
                url: CA_LICENSE_URL,
              },
              {
                name: 'License #: RBQA007338',
                url: GA_LICENSE_URL,
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
          phoneNumber={phoneLink}
        />
      );
    default:
      return <SimpleFooter {...footerProps} />;
  }
};

export default memo(AppFooter);
