import {HouseType} from '../types';

export type AppHouseListPageProps = {
  addHouse: (customerGID: number, address: AddAddressProps) => void;
  editHouse: (customerGID: number, houseId: string | number, address: AddAddressProps) => void;
  removeHouse: (customerGID: number, houseId: string | number) => void;
  houses: HouseType[];
  isListLoading: boolean;
  isPopupOpen?: boolean;
  isSuccessfullyRemoved?: boolean;
  listError: [] | null;
};

export type HouseCardProps = {
  house: HouseType;
  onEdit: (house: HouseType) => void;
  onRemove: (house: HouseType) => void;
};

export type AddAddressProps = {
  raw_address: string;
  zip_code: string;
  place_types: string[];
  location: {
    lat: number;
    lng: number;
  };
};

export type PageContentProps = {
  houses: HouseType[];
  onEdit: (house: HouseType) => void;
  onRemove: (house: HouseType) => void;
};

export type PageHeaderProps = {
  onAdd: () => void;
};
