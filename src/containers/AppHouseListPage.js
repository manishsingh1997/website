import {connect} from 'react-redux';

import {getHouses} from 'flux/actions/app-houses';
import AppHouseListPage from '../components/AppHouseListPage';

const mapStateToProps = ({houses}) => {
  return {
    houses: houses.data,
    isListLoading: houses.isListLoading,
    listError: houses.listError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHouses: (customerGID) => {
      dispatch(getHouses(customerGID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHouseListPage);
