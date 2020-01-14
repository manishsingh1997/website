import * as moment from 'moment';

export const formatDate = (date, format='MMM D, YYYY') => {
  return moment(date).format(format);
};

export const formatTime = (time, format='hh:mm a') => {
  return moment(time, 'HH:mm:ss').format(format);
};
