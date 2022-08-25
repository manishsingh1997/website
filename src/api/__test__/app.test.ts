import '@testing-library/jest-dom';

import {addCustomerHouse, editCustomerHouse, getCustomerHouses, getCustomerQuotes, removeCustomerHouse} from '../app';
import * as utils from '../utils';

jest.mock('axios');

const customerGIDMock = 'CUKaMTsSWOoGrqW3';

describe('api utils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should getCustomerHouses return correctly', () => {
    const mock = [
      {
        id: 192597,
        address: {
          formatted_address: '9969 Martin Rd, Windsor, CA 95492, USA',
          zip_code: '95492',
          latitude: 38.5573515,
          longitude: -122.8323591,
        },
        is_hidden: false,
        has_active_order: false,
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return mock;
    });
    expect(getCustomerHouses(customerGIDMock)).toEqual(mock);
  });
  it('should addCustomerHouse return correctly', () => {
    const response = {
      id: 192673,
      address: {
        formatted_address: '123 S Figueroa St, Los Angeles, CA 90012, USA',
        zip_code: '90012',
        latitude: 34.0574397,
        longitude: -118.2528706,
      },
      is_hidden: false,
      has_active_order: false,
    };
    const payload = {
      raw_address: '123 S Figueroa St, Los Angeles, CA 90012, USA',
      zip_code: '90012',
      place_types: ['street_address'],
      location: {
        lat: 34.0572772,
        lng: -118.2526665,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(addCustomerHouse(customerGIDMock, payload)).toEqual(response);
  });

  it('should editCustomerHouse return correctly', () => {
    const houseId = 192673;
    const response = {
      id: 192673,
      address: {
        formatted_address: '7415 Southwest Pkwy, Austin, TX 78735, USA',
        zip_code: '78735',
        latitude: 30.2565562,
        longitude: -97.8704572,
      },
      is_hidden: false,
      has_active_order: false,
    };
    const payload = {
      raw_address: '7415 Southwest Pkwy, Austin, TX 78735, USA',
      zip_code: '78735',
      place_types: ['street_address'],
      location: {
        lat: 30.25655620000001,
        lng: -97.87045719999999,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(editCustomerHouse(customerGIDMock, houseId, payload)).toEqual(response);
  });

  it('should removeCustomerHouse return correctly', () => {
    const houseId = 192673;
    const response = {
      id: 192673,
      address: {
        formatted_address: '7415 Southwest Pkwy, Austin, TX 78735, USA',
        zip_code: '78735',
        latitude: 30.2565562,
        longitude: -97.8704572,
      },
      is_hidden: true,
      has_active_order: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(removeCustomerHouse(customerGIDMock, houseId)).toEqual(response);
  });

  it('should getCustomerQuotes resolve correclty', async () => {
    const response = {customerGID: customerGIDMock};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await getCustomerQuotes(customerGIDMock)).toEqual(response);
  });
});
