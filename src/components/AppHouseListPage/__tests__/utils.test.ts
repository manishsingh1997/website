import '@testing-library/jest-dom';
import {getInitalAddress, parseAddressData} from '../utils';

const mockAddress = {
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

const mockHouse = {
  id: 192114,
  address: {
    formatted_address: '321 E Erie St, Chicago, IL 60611, USA',
    zip_code: '60611',
    latitude: 41.8938226,
    longitude: -87.61955,
  },
  is_hidden: false,
  has_active_order: false,
};

describe('utils', () => {
  it('should return the parsed address correctly', () => {
    const newData = parseAddressData(mockAddress);

    expect(newData).toStrictEqual({
      location: {lat: 34.0572772, lng: -118.2526665},
      place_types: ['street_address'],
      raw_address: '123 S Figueroa St, Los Angeles, CA 90012, USA',
      zip_code: '90012',
    });
  });
  it('should return null if the address is missing', () => {
    // @ts-ignore
    delete mockAddress.address;
    const newData = parseAddressData(mockAddress);

    expect(newData).toStrictEqual(null);
  });

  it('should return the initial address', () => {
    const address = getInitalAddress(mockHouse);
    expect(address).toStrictEqual('321 E Erie St');
  });

  it('should return null on error', () => {
    // @ts-ignore
    delete mockHouse.address;
    const address = getInitalAddress(mockHouse);
    expect(address).toStrictEqual(null);
  });
});
