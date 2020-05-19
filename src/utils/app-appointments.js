import {currentNow, getTimeInPST} from './date';

export const APPOINTMENT_FILTERS = [
  {value: 'upcoming', label: 'Upcoming'},
  {value: 'past', label: 'Past'},
  {value: 'all', label: 'All'},
];

export const filterAppointmentsByDate = (appointments, selectedOption) => {
  appointments = appointments.filter((appointment) => {
    if (selectedOption['value'] === APPOINTMENT_FILTERS[0].value) {
      const dateTime = `${appointment['date']} ${appointment['time_end']}`;
      return getTimeInPST(dateTime) >= currentNow();
    } else if (selectedOption['value'] === APPOINTMENT_FILTERS[1].value) {
      const dateTime = `${appointment['date']} ${appointment['time_end']}`;
      return getTimeInPST(dateTime) < currentNow();
    }
    return true;
  });

  return appointments;
};
