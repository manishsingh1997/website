import {ThunkActionDispatch} from 'redux-thunk';
import {connect} from 'react-redux';

import AppHouseListPage from '../components/AppHouseListPage';
import {HouseType} from '../components/types';
import {getHouses, addHouse} from '../flux/actions/app-houses';
import {GetHouseDispatcher} from '../flux/actions/types';
import {Action} from '../flux/store';
import {AddAddressProps} from '../components/AppHouseListPage/types';

type HousesProps = {
  data: HouseType[];
  isListLoading: boolean;
  isPopupOpen: boolean;
  listError: null | [];
};

const mapStateToProps = ({houses}: {houses: HousesProps}) => {
  return {
    houses: houses.data,
    isListLoading: houses.isListLoading,
    isPopupOpen: houses.isPopupOpen,
    listError: houses.listError,
  };
};

const mapDispatchToProps = (dispatch: (action: ThunkActionDispatch<Action<GetHouseDispatcher>>) => void) => {
  return {
    getHouses: (customerGID: number) => {
      dispatch(getHouses(customerGID));
    },
    addHouse: (customerGID: number, address: AddAddressProps) => {
      dispatch(addHouse(customerGID, address));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHouseListPage);
