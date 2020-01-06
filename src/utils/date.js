import * as moment from 'moment';

export const formatDate = (date, format='MMM D, YYYY') => {
  return moment(date).format(format);
};
