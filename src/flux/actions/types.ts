import {Action} from 'redux';
import {HouseType} from '../../components/AppHouseListPage/types';
import {ParsedAPIErrorType} from '../../utils/types';

export interface GetHouseRequest {
  type?: string;
  data?: HouseType[];
  error?: ParsedAPIErrorType;
}

export type GetHouseDispatcher = (dispatch: (props: GetHouseRequest) => Action) => void;
