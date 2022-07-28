import {Address} from '../types';
import {AddAddressProps} from './types';

export const parseAddressData = (data: {address: Address}): AddAddressProps | null => {
  try {
    return {
      raw_address: data.address.formatted_address,
      zip_code: data.address.zipcode,
      place_types: data.address.place_types,
      location: data.address.location,
    };
  } catch {
    return null;
  }
};
