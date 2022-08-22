import {ThunkActionDispatch} from 'redux-thunk';

import {connect} from 'react-redux';

import AppLayout from '../components/AppLayout';
import {AddAddressProps} from '../components/AppHouseListPage/types';
import {Action} from '../flux/store';
import {GetHouseDispatcher, HouseAction} from '../flux/actions/types';
import {addHouse, getHouses, HouseActionTypes} from '../flux/actions/app-houses';
import {HouseReducerState} from '../flux/reducers/app-houses';
import {AuthType} from '../components/AuthLogoutPage/types';
import {SelectedHouseReducerState} from '../flux/reducers/app-selected-house';
import {HouseType} from '../components/types';

const mapStateToProps = ({
  auth,
  houses,
  selectedHouse,
}: {
  auth: AuthType;
  houses: HouseReducerState;
  selectedHouse: SelectedHouseReducerState;
}) => {
  return {
    auth,
    houses: houses.data,
    selectedHouse: selectedHouse.data,
  };
};

const mapDispatchToProps = (
  dispatch: (action: HouseAction | ThunkActionDispatch<Action<GetHouseDispatcher>>) => void
) => {
  return {
    addHouse: (customerGID: number, address: AddAddressProps) => {
      dispatch(addHouse(customerGID, address));
    },
    getHouses: (customerGID: number) => {
      dispatch(getHouses(customerGID));
    },
    setSelectedHouse: (data: HouseType) => {
      dispatch({
        type: HouseActionTypes.SET_SELECTED_HOUSE,
        data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
