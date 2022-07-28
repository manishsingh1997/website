import '@testing-library/jest-dom';
import {parseAddressData} from '../utils';

const mockData = {
  address: {
    primary_number: '123',
    street_name: 'South Figueroa Street',
    city_name: 'Los Angeles',
    state_abbreviation: 'CA',
    zipcode: '90012',
    location: {
      lat: 34.0572772,
      lng: -118.2526665,
    },
    formatted_address: '123 S Figueroa St, Los Angeles, CA 90012, USA',
    raw_address: '123 S Figueroa St, Los Angeles, CA 90012, USA',
    place_types: ['street_address'],
  },
  productAvailability: {
    zipcode: '90012',
    supported: true,
    products: {
      'driveway-installation': true,
      'fence-replacement': true,
    },
    market: 'CS-LA',
  },
};

describe('utils', () => {
  it('should return the parsed address correctly', () => {
    const newData = parseAddressData(mockData);

    expect(newData).toStrictEqual({
      location: {lat: 34.0572772, lng: -118.2526665},
      place_types: ['street_address'],
      raw_address: '123 S Figueroa St, Los Angeles, CA 90012, USA',
      zip_code: '90012',
    });
  });
  it('should return null if the address is missing', () => {
    // @ts-ignore
    delete mockData.address;
    const newData = parseAddressData(mockData);

    expect(newData).toStrictEqual(null);
  });
});
