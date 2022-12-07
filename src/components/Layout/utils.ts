import {get} from 'lodash';
import {constants} from '@ergeon/3d-lib';

import {Lead} from '../types';

export const checkRouteList = (routes: string[] = [], location: Location) => {
  const pathname = location ? location.pathname : '/';
  let included = false;
  routes.forEach((path) => {
    if (pathname.includes(path)) included = true;
  });
  return included;
};

export const updateLeadWithZipcode = (lead: Lead): Lead => {
  const zipcode = get(lead, `productAvailability.products[${lead.product_slug}]`)
    ? lead.address?.zipcode
    : constants.DEFAULT_ZIP;

  return {
    ...lead,
    zipcode,
  };
};
