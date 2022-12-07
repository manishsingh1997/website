import moment from 'moment';

import {TIMEZONE} from '../../website/constants';
import {currentNow, formatDate, formatDateAndTime, formatTime, getTimeInPST, isPastDate} from '../date';

let date;

describe('Test for utils date', () => {
  it('should date in past', () => {
    date = '2022-01-27T18:15:52.727414-08:00';
    if (date) {
      const pastDate = isPastDate(date);
      expect(pastDate).toBeTruthy();
    }
    date = null;
  });

  it('should data is null', () => {
    if (date === null) {
      const pastDateNull = isPastDate(date);
      expect(pastDateNull).toBe(false);
    }
  });

  it('should format date is formated date', () => {
    date = '2022-01-27T18:15:52.727414-08:00';
    if (date) {
      const formatedDate = formatDate(date);
      expect(formatedDate).toBe('Jan 28, 2022');
    }
    date = null;
  });

  it('should format date is null', () => {
    if (date === null) {
      const formatedDateNull = formatDate(date);
      expect(formatedDateNull).toBe(null);
    }
  });

  it('should format time is formated time', () => {
    date = '2022-01-27T18:15:52.727414-08:00';
    if (date) {
      const formatedTime = formatTime(date);
      expect(formatedTime).toBe('08:15 pm');
    }
    date = null;
  });

  it('should format time is null', () => {
    if (date === null) {
      const formatedTimeNull = formatTime(date);
      expect(formatedTimeNull).toBe(null);
    }
  });

  it('should format date and time is formated date', () => {
    date = '2022-01-27T18:15:52.727414-08:00';
    if (date) {
      const formatedDateAndTime = formatDateAndTime(date);
      expect(formatedDateAndTime).toBe('Jan 28, 2022, 07:45 am');
    }
    date = null;
  });
  
  it('should format date and time is null', () => {
    if (date === null) {
      const formatedDateAndTimeNull = formatDateAndTime(date);
      expect(formatedDateAndTimeNull).toBe(null);
    }
  });

  it('should get time in PST', () => {
    date = '2050-06-13 17:00:00';
    if (date) {
      const pstTime = getTimeInPST(date);
      expect(pstTime.format()).toBe('2050-06-13T17:00:00-08:00');
    }
  });

  it('should current timezone', () => {
    const currentDate = currentNow().format();
    const currentDateFromTimeZone = moment.tz(TIMEZONE).format();
    expect(currentDate).toBe(currentDateFromTimeZone);
  });
});
