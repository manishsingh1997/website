import smartlookClient from 'smartlook-client';
import faker from '@faker-js/faker';

import {initSmartLook} from './utils';

jest.mock('smartlook-client', () => ({
  init: jest.fn(),
}));

describe('SmartLook integration', () => {
  test('initSmartLook', () => {
    const testCode = faker.datatype.uuid();
    initSmartLook(testCode);

    expect(smartlookClient.init).toBeCalledWith(testCode);
  });
});
