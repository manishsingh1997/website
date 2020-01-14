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
    getAppointments: (customerGID, startFromDate) => {
      dispatch(getAppointments(customerGID, startFromDate));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAppointmentsListPage);
