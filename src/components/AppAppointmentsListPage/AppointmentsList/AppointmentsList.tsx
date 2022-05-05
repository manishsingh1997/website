import React, {Fragment, useCallback, useContext, useMemo} from 'react';
import {Link} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import {DataRow} from '@ergeon/core-components';

import CustomerGIDContext from '../../../context-providers/CustomerGIDContext';
import {getFormattedAddress} from '../../../utils/app-house';
import {formatDate, formatTime} from '../../../utils/date';
import AppSubCard from '../../common/AppSubCard';
import {Appointment, AppointmentOrder} from '../types';

const AppointmentsList = ({appointments}: {appointments: Appointment[]}) => {
  const customerGID = useContext(CustomerGIDContext);
  const haveAppointments = useMemo(() => !isEmpty(appointments), [appointments]);

  const getOrderDetailLink = useCallback((order: AppointmentOrder) => {
    const url = `/app/${customerGID}/orders/${order.id}`;
    const label = `${order.product.name} #${order.id}`;
    return (
      <Link to={url}> {label} </Link>
    );
  }, [customerGID]);

  const renderAppointmentContent = useCallback((appointment: Appointment) => {
    return (
      <Fragment>
        <DataRow title="Date" value={formatDate(appointment.date)} />
        <DataRow title="Time Start" value={formatTime(appointment.time_start)} />
        <DataRow title="Time End" value={formatTime(appointment.time_end)} />
        <DataRow title="Address" value={getFormattedAddress(appointment.order.house)} />
        <DataRow title="Order" value={getOrderDetailLink(appointment.order)} />
        <DataRow title="Agent name" value={appointment.agent_name} />
      </Fragment>
    );
  }, [getOrderDetailLink]);

  const renderAppointmentHeader = (appointment: Appointment) => {
    return `${appointment.type} for ${appointment.order.product.name}`;
  }

  if (haveAppointments) {
    return (
      <Fragment>
        {appointments.map((appointment) =>
          <AppSubCard
            key={`appointment-${appointment.id}`}
            renderContent={() => renderAppointmentContent(appointment)}
            renderHeader={() => renderAppointmentHeader(appointment)}/>
        )}
      </Fragment>
    );
  }
  return <div className="center error">No appointments to show, try changing the filter.</div>;
};

export default AppointmentsList;
