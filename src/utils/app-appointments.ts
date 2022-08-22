import {Appointment, AppointmentsFilter, OptionType} from '../components/AppAppointmentsListPage/types';

import {currentNow, getTimeInPST} from './date';

export const APPOINTMENT_FILTER_OPTIONS: OptionType[] = [
  {value: 'Upcoming', label: 'Upcoming'},
  {value: 'Past', label: 'Past'},
  {value: 'All', label: 'All'},
];

export const getFilterOption = (selectedFilter: AppointmentsFilter): OptionType => {
  return {
    value: selectedFilter,
    label: selectedFilter,
  };
}

export const filterAppointmentsByDate = (appointments: Appointment[], selectedFilter: AppointmentsFilter) => {
  const filteredAppointments = appointments.filter((appointment) => {
    const dateTime = `${appointment.date} ${appointment.time_end}`;

    if (selectedFilter === AppointmentsFilter.UPCOMING) {
      return getTimeInPST(dateTime) >= currentNow();
    }
    if (selectedFilter === AppointmentsFilter.PAST) {
      return getTimeInPST(dateTime) < currentNow();
    }
    return true;
  });

  return filteredAppointments;
};
