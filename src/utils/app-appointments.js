export const APPOINTMENT_FILTERS = [
  {value: 'upcoming', label: 'Upcoming'},
  {value: 'past', label: 'Past'},
  {value: 'all', label: 'All'},
];

export const filterAppointmentsByDate = (appointments, selectedOption) => {
  appointments = appointments.filter((appointment) => {
    if (selectedOption['value'] === APPOINTMENT_FILTERS[0].value) {
      return new Date(appointment['date']) >= new Date();
    } else if (selectedOption['value'] === APPOINTMENT_FILTERS[1].value) {
      return new Date(appointment['date']) < new Date();
    }
    return true;
  });

  return appointments;
};
