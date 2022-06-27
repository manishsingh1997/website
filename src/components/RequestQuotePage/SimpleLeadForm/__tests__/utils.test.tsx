import '@testing-library/jest-dom';
import { isFullAddress } from '../utils';

describe('SimpleLeadForm Utils tests', () => {
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
