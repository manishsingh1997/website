import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {formatDate, formatTime} from 'utils/date';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import DataRow from 'components/common/DataRow';

import AppPage from 'components/common/AppPage';
import AppSubCard from 'components/common/AppSubCard';

export default class AppAppointmentsListPage extends React.Component {

  static propTypes = {
    appointments: PropTypes.array,
    getAppointments: PropTypes.func.isRequired,
    isListLoading: PropTypes.bool.isRequired,
    listError: PropTypes.object,
  };

  static contextType = CustomerGIDContext;

  fetchData() {
    const {appointments, getAppointments} = this.props;
    const customerGID = this.context;
    const startFromDate = new Date();
    if (!appointments) {
      getAppointments(customerGID, startFromDate);
    }
  }

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

  renderListElementContent(appointment) {
    return (
      <React.Fragment>
        <DataRow title="Date" value={formatDate(appointment['ordered_at'])}/>
        <DataRow title="Time Start" value={formatTime(appointment['time_start'])}/>
        <DataRow title="Time End" value={formatTime(appointment['time_end'])}/>
        <DataRow title="Address" value={this.getAddress(appointment['order'])}/>
        <DataRow title="Order" value={this.getOrderDetailLink(appointment['order'])}/>
        <DataRow title="Agent name" value={appointment['agent_name']}/>
      </React.Fragment>
    );
  }

  renderContent() {
    const {appointments} = this.props;

    return (
      <React.Fragment>
        {appointments && appointments.map(appointment => (
          <AppSubCard
            key={`appointment-${appointment.id}`}
            renderContent={this.renderListElementContent.bind(this, appointment)}
            renderHeader={() => `${appointment['type']} for ${appointment['order']['product']['name']}`} />
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <AppPage
        error={this.props.listError}
        fetchData={this.fetchData.bind(this)}
        isLoading={this.props.isListLoading}
        renderContent={this.renderContent.bind(this)}
        renderHeader={() => 'Appointments'} />
    );
  }

}
