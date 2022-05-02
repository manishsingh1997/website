import {ThunkActionDispatch} from 'redux-thunk';
import {connect} from 'react-redux';

import {getAppointments} from '../flux/actions/app-appointments';
import AppAppointmentsListPage from '../components/AppAppointmentsListPage';
import {Appointment} from '../components/AppAppointmentsListPage/types';
import {Action} from '../flux/store';
import {GetAppointmentDispatcher} from '../flux/actions/types';

type AppointmentsProps = {
  data: Appointment[],
  isListLoading: boolean,
  listError: [] | null,
}

const mapStateToProps = ({appointments}: {appointments: AppointmentsProps}) => {
  return {
    appointments: appointments.data,
    isListLoading: appointments.isListLoading,
    listError: appointments.listError,
  };
};

const mapDispatchToProps = (dispatch: (action: ThunkActionDispatch<Action<GetAppointmentDispatcher>>) => void) => {
  return {
    getAppointments: (customerGID: number) => {
      dispatch(getAppointments(customerGID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAppointmentsListPage);
