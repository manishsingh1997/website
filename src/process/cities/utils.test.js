import {addWarrantyAndFullNameToCities} from './utils';

describe('Cities parse utils', () => {
  it('should update cities data with warranty link and full name', () => {
    const cities = [
      {
        state: 'CA',
      },
      {
        state: 'TX',
      },
      {
        state: 'GA',
      },
      {
        state: 'PA',
      },
    ];

    const results = addWarrantyAndFullNameToCities(cities);

    results.forEach((city) => {
      expect(city['state_full_name']).toBeTruthy();
      expect(city['warranty']).toBeTruthy();
    });
  });
});
