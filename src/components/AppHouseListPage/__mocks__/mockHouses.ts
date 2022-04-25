import {HouseType} from '../types';

export const mockHouseA: HouseType = {
  id: 1,
  address:{
    formatted_address: '300 Wood Falls Ct, Roseville, CA 95678, USA',
    zip_code: '95678',
    latitude: 39,
    longitude: -121
  }
};

export const mockHouseB: HouseType = {
  id: 2,
  address:{
    formatted_address: '200 Wood Falls Ct, Roseville, CA 95678, USA',
    zip_code: '95678',
    latitude: 38,
    longitude: -122,
  }
};
