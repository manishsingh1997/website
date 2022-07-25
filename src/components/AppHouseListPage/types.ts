import {HouseType} from '../types';

export type AppHouseListPageProps = {
  getHouses: (customerGID: number) => void;
  houses: HouseType[];
  isListLoading: boolean;
  listError: [] | null;
};

export type HouseCardProps = {
  house: HouseType;
  onEdit: (house: HouseType) => void;
  onRemove: (house: HouseType) => void;
};
