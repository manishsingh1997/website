import * as moment from 'moment';

const DEFAULT_DATE_FORMAT = 'MMM D, YYYY';
const DEFAULT_TIME_FORMAT = 'hh:mm a';
const DEFAULT_DATE_TIME_FORMAT = `${DEFAULT_DATE_FORMAT}, ${DEFAULT_TIME_FORMAT}`;

export const isPastDate = (date) => {
  if (!date) {
    return false;
  }
  const now = moment();
  return moment(date) < now;
};

export const formatDate = (date, format=DEFAULT_DATE_FORMAT) => {
  if (!date) {
    return null;
  }
  return moment(date).format(format);
};

export const formatTime = (time, format=DEFAULT_TIME_FORMAT) => {
  if (!time) {
    return null;
  }
  return moment(time, 'HH:mm:ss').format(format);
};

export const formatDateAndTime = (date, format=DEFAULT_DATE_TIME_FORMAT) => {
  if (!date) {
    return null;
  }
  return moment(date).format(format);
};
