import {connect} from 'react-redux';
import {ThunkActionDispatch} from 'redux-thunk';

import AppHouseListPage from '../components/AppHouseListPage';
import {HouseType} from '../components/types';
import {getHouses} from '../flux/actions/app-houses';
import {GetHouseDispatcher} from '../flux/actions/types';
import {Action} from '../flux/store';

type HousesProps = {
  data: HouseType[],
  isListLoading: boolean,
  listError: null | []
}

const mapStateToProps = ({houses}: {houses: HousesProps }) => {
  return {
    houses: houses.data,
    isListLoading: houses.isListLoading,
    listError: houses.listError,
  };
};

const mapDispatchToProps = (dispatch: (action: ThunkActionDispatch<Action<GetHouseDispatcher>>) => void) => {
  return {
    getHouses: (customerGID: number) => {
      dispatch(getHouses(customerGID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHouseListPage);
