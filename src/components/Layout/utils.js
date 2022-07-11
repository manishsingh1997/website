import {get} from 'lodash';
import {constants} from '@ergeon/3d-lib';

export const checkRouteList = (routes = [], location) => {
  const pathname = location ? location.pathname : '/';
  let included = false;
  routes.forEach((path) => {
    if (pathname.includes(path)) included = true;
  });
  return included;
};

export const updateLeadWithZipcode = (lead) => {
  const zipcode = get(lead, `productAvailability.products[${lead.product_slug}]`)
    ? lead.address.zipcode
    : constants.DEFAULT_ZIP;

  return {
    ...lead,
    zipcode,
  };
};
