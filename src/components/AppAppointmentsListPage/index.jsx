import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {formatDate, formatTime} from 'utils/date';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import withDataLoader from 'components/common/withDataLoader';
import DataRow from 'components/common/DataRow';

import './index.scss';

const withDataLoaderWrapper = withDataLoader({
  fetchData: (props, context) => {
    const {appointments, getAppointments} = props;
    const customerGID = context;
    const startFromDate = new Date();
    if (!appointments) {
      getAppointments(customerGID, startFromDate);
    }
  },
  isLoading: (props) => props.isListLoading,
  getError: (props) => props.listError,
  contextType: CustomerGIDContext,
});

class AppAppointmentsListPage extends React.Component {

  static propTypes = {
    appointments: PropTypes.array,
    getAppointments: PropTypes.func.isRequired,
    isListLoading: PropTypes.bool.isRequired,
    listError: PropTypes.object,
  };

  static contextType = CustomerGIDContext;

  getAddress(order) {
    return order['house']['address']['formatted_address'];
  }

  getOrderDetailLink(order) {
    const customerGID = this.context;
    return (
      <Link to={`/app/${customerGID}/orders/${order['id']}`}>
        {`${order['product']['name']} #${order['id']}`}
      </Link>
    );
  }

  render() {
    const {appointments} = this.props;

    return (
      <div className="appointments-page">
        <h4 className="flex-row align-center">
          <div>Appointments</div>
        </h4>
        <div>
          {appointments && appointments.map(appointment => (
            <div
              className="app-subcard card shadow border padding-20 spacing before__is-12"
              key={`appointment-${appointment.id}`}>
              <h6 className="flex-row align-center">
                <div>{`${appointment['type']} for ${appointment['order']['product']['name']}`}</div>
              </h6>
              <DataRow title="Date" value={formatDate(appointment['ordered_at'])}/>
              <DataRow title="Time Start" value={formatTime(appointment['time_start'])}/>
              <DataRow title="Time End" value={formatTime(appointment['time_end'])}/>
              <DataRow title="Address" value={this.getAddress(appointment['order'])}/>
              <DataRow title="Order" value={this.getOrderDetailLink(appointment['order'])}/>
              <DataRow title="Agent name" value={appointment['agent_name']}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withDataLoaderWrapper(AppAppointmentsListPage);
