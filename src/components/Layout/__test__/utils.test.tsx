import {constants} from '@ergeon/3d-lib';
import '@testing-library/jest-dom';

import {checkRouteList, updateLeadWithZipcode} from '../utils';
import {leadData, productAvailabilityData, addressData} from '../__mocks__/mockData';
import {Lead} from '../../types';

const LEAD_ID = 'AdBh0inoUKGlH';
const mockLocation = document.location;
const mockPathname = `/app/${LEAD_ID}`;
const location = {...mockLocation, search: '', pathname: `${mockPathname}/request-quote`};

describe('checkRouteList', () => {
  test('should return true for  path included in routes', () => {
    const routes = ['/request-quote', '/app/'];
    const isInRoute = checkRouteList(routes, location);

    expect(isInRoute).toBeTruthy();
  });

  test('should return false for path not included in routes', () => {
    const routes = ['/sign-in'];
    const isInRoute = checkRouteList(routes, location);

    expect(isInRoute).toBeFalsy();
  });
});

describe('updateLeadWithZipcode', () => {
  test('When product is available, should call update lead function with address zipcode', () => {
    const mockLeadData: Lead = {
      ...leadData,
      productAvailability: productAvailabilityData,
    };
    const updatedLead = updateLeadWithZipcode(mockLeadData);

    expect(updatedLead).toEqual({...mockLeadData, zipcode: addressData.zipcode});
  });

  test('When product is not available, should call update lead function with default zipcode', () => {
    const mockLeadData: Lead = {
      ...leadData,
      productAvailability: {
        ...productAvailabilityData,
        products: {
          'driveway-installation': true,
        },
      },
    };

    const updatedLead = updateLeadWithZipcode(mockLeadData);

    expect(updatedLead).toEqual({...mockLeadData, zipcode: constants.DEFAULT_ZIP});
  });
});
