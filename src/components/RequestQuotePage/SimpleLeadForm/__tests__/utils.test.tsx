import '@testing-library/jest-dom';
import { formatPhoneNumber } from '../../utils';
import { isFullAddress } from '../utils';

describe('SimpleLeadForm Utils tests', () => {
  describe('formatPhoneNumber tests', () => {
    it('should format string to a valid phone number', () => {
      const phone = '1234567890';
      const val = formatPhoneNumber(phone);
      expect(val).toBe('(123) 456-7890');
    });

    it('should return null due invalid string', () => {
      const phone = 'test';
      const val = formatPhoneNumber(phone);
      expect(val).toBeNull();
    });
  });

  describe('isFullAddress tests', () => {
    it('should return true if address is full', () => {
      const address = {
        primary_number: '123',
        street_name: 'Palo Alto Avenue',
        city_name: 'Palo Alto',
        state_abbreviation: 'CA',
        zipcode: '94301',
      };
      const val = isFullAddress(address);
      expect(val).toBe(true);
    });

    it('should return false if address is wrong', () => {
      const address = {
        city_name: 'Sacramento',
        state_abbreviation: 'CA',
      };
      const val = isFullAddress(address);
      expect(val).toBe(false);
    });
  });
});
