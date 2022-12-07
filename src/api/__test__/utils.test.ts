import '@testing-library/jest-dom';
import axios from 'axios';

import {getReqMethod, request} from '../utils';

jest.mock('axios');

describe('api utils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should getReqMethod return get by default', () => {
    const method = getReqMethod();
    expect(method).toStrictEqual('get');
  });
  it('should getReqMethod return post when data exists', () => {
    const method = getReqMethod(undefined, {
      id: 192114,
      address: {
        formatted_address: '321 E Erie St, Chicago, IL 60611, USA',
        zip_code: '60611',
        latitude: 41.8938226,
        longitude: -87.61955,
      },
      is_hidden: false,
      has_active_order: false,
    });
    expect(method).toStrictEqual('post');
  });
  it('should getReqMethod return patch if method is patch', () => {
    const method = getReqMethod('patch');
    expect(method).toStrictEqual('patch');
  });

  it('should axios request resolves correctly', async () => {
    axios.get = jest.fn().mockResolvedValue({});
    await expect(request()('/')).resolves.toEqual({
      data: [
        {
          additional_emails: [],
          additional_phones: [],
          id: 169836,
          is_email_newsletter_ok: true,
          is_primary: true,
          primary_email: {
            formatted_identifier: 'testemail@ergeon.com',
            id: 334815,
            identifier: 'testemail@ergeon.com',
            label: null,
            type: 'email',
          },
          primary_phone: {
            formatted_identifier: '(533) 616-6659',
            id: 334816,
            identifier: '+15336166659',
            label: null,
            type: 'phone',
          },
        },
      ],
    });
  });
});
