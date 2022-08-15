import {parseError, retryRequest} from '../utils';
import {getStreetFromAddress} from '../app-house';
import {HouseType} from '../../components/types';

describe('utils helpers', () => {
  test('request gets retried when wrapped', async () => {
    const count = 5;
    let retries = {count};
    const mockCallback = jest.fn((err: unknown) => {
      if (err) return;
      retries.count -= 1;
      return Promise.resolve({data: ''});
    });

    await retryRequest(count, mockCallback);
    expect(count).toBeGreaterThan(retries.count);
    expect(retries.count).toBe(4);
  });

  test('request gets retried multiple times if it fails', async () => {
    const count = 5;
    let retries = {count};
    const mockCallback = jest.fn((err: unknown) => {
      if (err) return;
      if (retries.count == 0) return;
      retries.count -= 1;
      return Promise.reject('error');
    });

    await retryRequest(count, mockCallback);
    expect(count).toBeGreaterThan(retries.count);
    expect(retries.count).toBe(0);
  });

  test('should test parseError method', () => {
    expect(parseError({responseText: {hello: 'world'}, statusText: 'error'})).toBe('error');
    expect(
      parseError({
        responseText: JSON.stringify({a: ['firstValue']}),
        statusText: 'error',
      })
    ).toBe("firstValue: 'a'");
    expect(
      parseError({
        responseText: JSON.stringify({a: 'basicValue'}),
        statusText: 'error',
      })
    ).toBe("basicValue: 'a'");
  });

  test('getStreetFromAddress returns street and finalAddress', () => {
    const mockHouseA: HouseType = {
      id: 1,
      address: {
        formatted_address: '300 Wood Falls Ct, Roseville, CA 95678, USA',
        zip_code: '95678',
        latitude: 39,
        longitude: -121,
      },
      has_active_order: true,
    };

    const [street, finalAddress] = getStreetFromAddress(mockHouseA);

    expect(street).toBe('300 Wood Falls Ct');
    expect(finalAddress).toBe('Roseville, CA 95678, USA');
  });
});
