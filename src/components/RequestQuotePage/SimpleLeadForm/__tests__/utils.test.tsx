import '@testing-library/jest-dom';
import { isMinimumValidAddress } from '../utils';

describe('SimpleLeadForm Utils tests', () => {
  describe('isMinimumValidAddress tests', () => {
    it('should return true if address is full', () => {
      const address = {
        primary_number: '123',
        street_name: 'Palo Alto Avenue',
        city_name: 'Palo Alto',
        state_abbreviation: 'CA',
        zipcode: '94301',
      };
      const val = isMinimumValidAddress(address);
      expect(val).toBe(true);
    });

    it('should return true if address is on it minimum (City, State)', () => {
      const address = {
        city_name: 'Sacramento',
        state_abbreviation: 'CA',
      };
      const val = isMinimumValidAddress(address);
      expect(val).toBe(true);
    });

    it('should return false if address is empty', () => {
      const address = undefined;
      const val = isMinimumValidAddress(address);
      expect(val).toBe(false);
    });

    it('should return false if address is missing minimum valid fields', () => {
      const address = {
        formatted_address: 'United States',
        raw_address: 'United States'
      };
      const val = isMinimumValidAddress(address);
      expect(val).toBe(false);
    });
  });
});
