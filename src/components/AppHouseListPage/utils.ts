import {Address, HouseType} from '../types';

import {AddAddressProps} from './types';

export const parseAddressData = (data: {address: Address}): AddAddressProps | null => {
  try {
    return {
      raw_address: data.address.formatted_address,
      zip_code: data.address.zipcode,
      place_types: data.address.place_types,
      location: data.address.location,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getInitalAddress = (house: HouseType) => {
  try {
    const [address] = house.address.formatted_address.split(',');
    return address;
  } catch (error) {
    console.error(error);
    return null;
  }
};
