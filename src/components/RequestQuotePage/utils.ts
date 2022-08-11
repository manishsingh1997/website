import {CatalogType} from '@ergeon/3d-lib';
import {ConfigItemsNames} from './constants';

export type Address = {
  primary_number?: string;
  street_name?: string;
  city_name?: string;
  state_abbreviation?: string;
  zipcode?: string;
  formated_address?: string;
  raw_address?: string;
};

export const stringifyAddress = (address: Address | undefined) => {
  if (address) {
    const addressParts = [
      address.primary_number,
      address.street_name,
      address.city_name,
      address.state_abbreviation,
      address.zipcode,
    ];
    return addressParts.join(', ');
  }
  return '';
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = `${phoneNumber}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

export const getConfigName = (catalogType: CatalogType) => {
  return ConfigItemsNames[catalogType] ?? ConfigItemsNames[CatalogType.FENCE];
};
