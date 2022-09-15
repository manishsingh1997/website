import {CatalogType} from '@ergeon/3d-lib';
// eslint-disable-next-line import/named
import {RouteComponentProps} from 'react-router-dom';

export interface Address {
  primary_number: string;
  street_name: string;
  city_name: string;
  state_abbreviation: string;
  zipcode: string;
  location: {
    lat: number | (() => number);
    lng: number | (() => number);
  };
  formatted_address: string;
  raw_address: string;
  place_types: string[];
}

// Duplicated type from 3d-lib
export interface Value {
  capRail?: boolean;
  code: string;
  deleted?: boolean;
  image?: string;
  imageThumbnail?: string;
  nominalSize?: number[];
  fullFrame?: boolean;
  postCapOption?: boolean;
  size?: number[];
  slug: string;
  steelPost?: boolean;
  title: string;
  future?: boolean;
}

// Duplicated type from 3d-lib
export interface ProductConfigType {
  [index: number]: Value;
}

export interface Config {
  id: string;
  catalog_type: CatalogType;
  code: string;
  product: ProductConfigType | null;
  preview: string | null;
  description: string;
  grade: number;
  price: string;
  units: number;
  timestamp: number;
}

export interface ProductAvailability {
  zipcode: string;
  supported: boolean;
  products: Record<string, boolean>;
  market: string;
}

export interface Lead {
  address: Address;
  product_slug: string;
  productAvailability: ProductAvailability | null;
  zipcode: string;
}

export interface User {
  email: string;
  full_name: string;
  phone_number: string;
  main_address?: {
    formatted_address: string;
  };
}

export interface Auth {
  user: User | null;
  isUserLoggedOut: boolean;
  isAuthLoading: boolean;
  logoutError: string | null;
  isUserLoading: boolean;
  userError: string | null;
}

export interface LeadAddress {
  address: string;
  product: string;
  zipcode: string;
}

export interface LeadConfigType {
  address?: string;
  product?: string;
  zipcode: string;
  grade?: number;
  data: ProductConfigType | null;
  schemaCode: string;
  length?: number;
  configs: Config[];
}

export interface RequestQuotePageProps extends RouteComponentProps {
  addConfig: () => void;
  address: string;
  auth: Auth;
  changeProduct: () => void;
  configs: Config[];
  lead: Lead | null;
  openAddressUpdatePopup: () => void;
  product: string;
  updateLeadAndConfig: (data: LeadConfigType) => void;
  updateLeadFromAddress: (leadAddress: LeadAddress) => void;
  updateProduct: (product: string) => void;
  zipcode: string;
}

export type RequestQuotePageState = {
  showThankYou: boolean;
  showConfigCart: boolean;
  showStyleBrowser: boolean;
};
