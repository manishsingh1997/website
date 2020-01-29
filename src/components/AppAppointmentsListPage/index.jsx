import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {SelectFilter} from '@ergeon/core-components';

import {formatDate, formatTime} from 'utils/date';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import DataRow from 'components/common/DataRow';

import AppPage from 'components/common/AppPage';
import AppSubCard from 'components/common/AppSubCard';
import {filterAppointmentsByDate, APPOINTMENT_FILTERS} from 'utils/app-appointments';

import './index.scss';

export default class AppAppointmentsListPage extends React.Component {

  static propTypes = {
    appointments: PropTypes.array,
    getAppointments: PropTypes.func.isRequired,
    isListLoading: PropTypes.bool.isRequired,
    listError: PropTypes.object,
  };

  state = {
    selectedOption: APPOINTMENT_FILTERS[0],
  };

  static contextType = CustomerGIDContext;

  fetchData() {
    const {appointments, getAppointments} = this.props;
    const customerGID = this.context;
    if (!appointments) {
      getAppointments(customerGID);
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

  handleChange = (selectedOption) => {
    this.setState({selectedOption});
  };

  isAppointmentsEmpty(appointments) {
    return !(appointments && appointments.length > 0);
  }

  renderListElementContent(appointment) {
    return (
      <React.Fragment>
        <DataRow title="Date" value={formatDate(appointment['date'])}/>
        <DataRow title="Time Start" value={formatTime(appointment['time_start'])}/>
        <DataRow title="Time End" value={formatTime(appointment['time_end'])}/>
        <DataRow title="Address" value={this.getAddress(appointment['order'])}/>
        <DataRow title="Order" value={this.getOrderDetailLink(appointment['order'])}/>
        <DataRow title="Agent name" value={appointment['agent_name']}/>
      </React.Fragment>
    );
  }

  renderHeader() {
    const {selectedOption} = this.state;
    const {appointments} = this.props;
    return (
      <React.Fragment>
        <div>Appointments</div>
        {!this.isAppointmentsEmpty(appointments) &&
        <div className="appointment-filters">
          <SelectFilter
            className="react-select-filter-container"
            classNamePrefix="react-select-filter"
            name="appointment_filter"
            onChange={this.handleChange}
            options={APPOINTMENT_FILTERS}
            value={selectedOption} />
        </div>}
      </React.Fragment>
    );
  }

  renderContent() {
    const {selectedOption} = this.state;
    const {appointments} = this.props;

    return (
      <React.Fragment>
        {appointments && filterAppointmentsByDate(appointments, selectedOption).map(appointment => (
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
        className="appointment-list-page"
        error={this.props.listError}
        fetchData={this.fetchData.bind(this)}
        isLoading={this.props.isListLoading}
        renderContent={this.renderContent.bind(this)}
        renderHeader={this.renderHeader.bind(this)} />
    );
  }

}
