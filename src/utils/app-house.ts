import {HouseType} from '../components/types';

export const getFormattedAddress = (houseData: HouseType) => {
  const {address} = houseData;
  if (address && address.formatted_address) {
    return address.formatted_address;
  }
  console.warn('Cannot get formatted_address from houseData.');
};
