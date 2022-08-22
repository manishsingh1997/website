import {ReactNode} from 'react';

import {AddAddressProps} from '../AppHouseListPage/types';
import {AuthType} from '../AuthLogoutPage/types';
import {HouseType} from '../types';

interface MatchParams {
  customerGid: string;
}

export interface MatchProps {
  url: string;
  params: MatchParams;
}

export type AppLayoutProps = {
  auth: AuthType;
  location: Location;
  children?: ReactNode;
  match: MatchProps;
  houses: HouseType[] | null;
  selectedHouse: HouseType | null;
  addHouse: (customerGID: number, address: AddAddressProps) => void;
  getHouses: (customerGID: number) => void;
  setSelectedHouse: (data: HouseType) => void;
};
