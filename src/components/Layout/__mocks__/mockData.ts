import {AuthState} from '../../../flux/reducers/auth';
import {Lead} from '../../types';

export const addressData = {
  primary_number: '12',
  street_name: 'Palo Alto Avenue',
  city_name: 'Palo Alto',
  state_abbreviation: 'CA',
  zipcode: '94301',
  location: {
    lat: 37.4465663,
    lng: -122.170966,
  },
  formatted_address: '12 Palo Alto Ave, Palo Alto, CA 94301, USA',
  raw_address: '12 Palo Alto Ave, Palo Alto, CA 94301, USA',
  place_types: ['street_address'],
};

export const productAvailabilityData = {
  zipcode: '94301',
  supported: true,
  products: {
    'driveway-installation': true,
    'fence-replacement': true,
  },
  market: 'CN-SJ',
};

export const leadData: Partial<Lead> = {
  address: addressData,
  product_slug: 'fence-replacement',
  zipcode: productAvailabilityData.zipcode,
};

export const mockLoggedInAuth: Partial<AuthState> = {
  user: {gid: 'iemoopheebii0Eet'},
  isAuthLoading: false,
  isUserLoading: false,
};

export const mockNotLoggedInAuth: Partial<AuthState> = {
  user: null,
  isUserLoggedOut: false,
  isAuthLoading: false,
  isUserLoading: false,
};
