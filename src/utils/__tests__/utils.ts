import {retryRequest} from '../utils';

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
      if (retries.count == 0) return
      retries.count -= 1;
      return Promise.reject('error');
    });

    await retryRequest(count, mockCallback);
    expect(count).toBeGreaterThan(retries.count);
    expect(retries.count).toBe(0);
  });
});
