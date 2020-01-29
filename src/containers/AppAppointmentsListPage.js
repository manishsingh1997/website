import {connect} from 'react-redux';

import {getAppointments} from 'flux/actions/app-appointments';
import AppAppointmentsListPage from 'components/AppAppointmentsListPage';

const mapStateToProps = ({appointments}) => {
  return {
    appointments: appointments.data,
    isListLoading: appointments.isListLoading,
    listError: appointments.listError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppointments: (customerGID) => {
      dispatch(getAppointments(customerGID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAppointmentsListPage);
