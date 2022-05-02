import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

import {SelectFilter} from '@ergeon/core-components';

import {formatDate, formatTime} from '../../utils/date';
import {getFormattedAddress} from '../../utils/app-house';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import DataRow from '../../components/common/DataRow';

import AppPage from '../../components/common/AppPage';
import AppSubCard from '../../components/common/AppSubCard';
import {APPOINTMENT_FILTER_OPTIONS, filterAppointmentsByDate, getFilterOption} from '../../utils/app-appointments';
import {Appointment, AppointmentOrder, AppointmentsFilter, OptionType} from './types';

import './index.scss';

export type AppAppointmentsListPageProps = {
  appointments?: Appointment[],
  getAppointments: (customerGID: number) => void,
  isListLoading: boolean,
  listError: [] | null,
};
export default class AppAppointmentsListPage extends React.Component<AppAppointmentsListPageProps> {
  state = {
    selectedFilter: AppointmentsFilter.UPCOMING,
  };

  static contextType = CustomerGIDContext;

  fetchData() {
    const {getAppointments} = this.props;
    const customerGID = this.context;
    getAppointments(customerGID);
  }

  getOrderDetailLink(order: AppointmentOrder) {
    const customerGID = this.context;
    const url = `/app/${customerGID}/orders/${order.id}`;
    const label = `${order.product.name} #${order.id}`;

    return (
      <Link to={url}> {label} </Link>
    );
  }

  handleChange = (selectedOption: OptionType) => {
    let newFilter: AppointmentsFilter | undefined;
    if (selectedOption.value == AppointmentsFilter.UPCOMING) {
      newFilter = AppointmentsFilter.UPCOMING;
    }
    if (selectedOption.value == AppointmentsFilter.PAST) {
      newFilter = AppointmentsFilter.PAST;
    }
    if (selectedOption.value == AppointmentsFilter.ALL) {
      newFilter = AppointmentsFilter.ALL;
    }
    this.setState({selectedFilter: newFilter});
  };

  isAppointmentsEmpty(appointments: Appointment[]) {
    return appointments.length === 0;
  }

  renderListElementContent(appointment: Appointment) {
    return (
      <React.Fragment>
        <DataRow title="Date" value={formatDate(appointment['date'])} />
        <DataRow title="Time Start" value={formatTime(appointment['time_start'])} />
        <DataRow title="Time End" value={formatTime(appointment['time_end'])} />
        <DataRow title="Address" value={getFormattedAddress(appointment['order']['house'])} />
        <DataRow title="Order" value={this.getOrderDetailLink(appointment['order'])} />
        <DataRow title="Agent name" value={appointment['agent_name']} />
      </React.Fragment>
    );
  }

  renderHeader() {
    const {selectedFilter} = this.state;
    const {appointments = []} = this.props;
    return (
      <Fragment>
        <div>Appointments</div>
        {!this.isAppointmentsEmpty(appointments) && (
          <div className="appointment-filters">
            <SelectFilter
              className="react-select-filter-container"
              classNamePrefix="react-select-filter"
              name="appointment_filter"
              onChange={this.handleChange}
              options={APPOINTMENT_FILTER_OPTIONS}
              value={getFilterOption(selectedFilter)}
            />
          </div>
        )}
      </Fragment>
    );
  }

  renderAppointments(appointments: Appointment[]) {
    return (
      <Fragment>
        {!this.isAppointmentsEmpty(appointments) ? (
          appointments.map((appointment) => (
            <AppSubCard
              key={`appointment-${appointment.id}`}
              renderContent={this.renderListElementContent.bind(this, appointment)}
              renderHeader={() => `${appointment.type} for ${appointment.order.product.name}`}
            />
          ))
        ) : (
          <div className="center error">No appointments to show, try changing the filter.</div>
        )}
      </Fragment>
    );
  }

  renderContent() {
    const {selectedFilter} = this.state;
    const {appointments = []} = this.props;
    const filteredAppointments = filterAppointmentsByDate(appointments, selectedFilter);
    return (
      <Fragment>
        {!this.isAppointmentsEmpty(filteredAppointments) ? (
          this.renderAppointments(filteredAppointments)
        ) : (
          <div className="center error">There are no appointments yet.</div>
        )}
      </Fragment>
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
        renderHeader={this.renderHeader.bind(this)}
      />
    );
  }
}
