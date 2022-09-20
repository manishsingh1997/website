import '@testing-library/jest-dom';

import {
  addCustomerHouse,
  editCustomerHouse,
  getCustomerContacts,
  getCustomerHouses,
  getCustomerQuotes,
  getQuoteDetails,
  removeCustomerHouse,
  getCustomerOrders,
  getCustomerOrderDetails,
  getCustomerAppointments,
  reviewQuote,
  reviewQuoteApproval,
  approveQuoteApproval,
  updateCustomerSignOffRequirement,
  updateCustomerContacts,
} from '../app';
import * as utils from '../utils';
import quoteMock from '../../components/AppQuoteListPage/__mock__/quoteList';
import { mockFirstOrderId, mockOrders } from '../../components/AppOrderDetailPage/__mocks__/mockOrders';
import {
  mockPastAppointment,
  mockUpcomingAppointmentId,
} from '../../components/AppAppointmentsListPage/__mocks__/mockAppointments';

jest.mock('axios');

const customerGIDMock = 'CUKaMTsSWOoGrqW3';

describe('api utils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should getCustomerHouses return correctly', () => {
    const mock = [
      {
        id: 192597,
        address: {
          formatted_address: '9969 Martin Rd, Windsor, CA 95492, USA',
          zip_code: '95492',
          latitude: 38.5573515,
          longitude: -122.8323591,
        },
        is_hidden: false,
        has_active_order: false,
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return mock;
    });
    expect(getCustomerHouses(customerGIDMock)).toEqual(mock);
  });
  it('should addCustomerHouse return correctly', () => {
    const response = {
      id: 192673,
      address: {
        formatted_address: '123 S Figueroa St, Los Angeles, CA 90012, USA',
        zip_code: '90012',
        latitude: 34.0574397,
        longitude: -118.2528706,
      },
      is_hidden: false,
      has_active_order: false,
    };
    const payload = {
      raw_address: '123 S Figueroa St, Los Angeles, CA 90012, USA',
      zip_code: '90012',
      place_types: ['street_address'],
      location: {
        lat: 34.0572772,
        lng: -118.2526665,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(addCustomerHouse(customerGIDMock, payload)).toEqual(response);
  });

  it('should editCustomerHouse return correctly', () => {
    const houseId = 192673;
    const response = {
      id: 192673,
      address: {
        formatted_address: '7415 Southwest Pkwy, Austin, TX 78735, USA',
        zip_code: '78735',
        latitude: 30.2565562,
        longitude: -97.8704572,
      },
      is_hidden: false,
      has_active_order: false,
    };
    const payload = {
      raw_address: '7415 Southwest Pkwy, Austin, TX 78735, USA',
      zip_code: '78735',
      place_types: ['street_address'],
      location: {
        lat: 30.25655620000001,
        lng: -97.87045719999999,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(editCustomerHouse(customerGIDMock, houseId, payload)).toEqual(response);
  });

  it('should removeCustomerHouse return correctly', () => {
    const houseId = 192673;
    const response = {
      id: 192673,
      address: {
        formatted_address: '7415 Southwest Pkwy, Austin, TX 78735, USA',
        zip_code: '78735',
        latitude: 30.2565562,
        longitude: -97.8704572,
      },
      is_hidden: true,
      has_active_order: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(removeCustomerHouse(customerGIDMock, houseId)).toEqual(response);
  });

  it('should getCustomerQuotes resolve correclty', async () => {
    const response = {
      data: quoteMock,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await getCustomerQuotes(customerGIDMock)).toEqual(response);
  });

  it('should get Quote Details when called', async () => {
    const quoteSecret = quoteMock[0].secret;
    const response = {
      data: quoteMock[0].secret,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await getQuoteDetails(customerGIDMock, quoteSecret)).toEqual(response);
  });

  it('should get Customer Contact when called', async () => {
    const contact = {
      id: 0,
      full_name: 'Alberto Cook',
      primary_email: 'alberto.cook@test.com',
      primary_phone: '920-360-0653',
      is_primary: true,
    };
    const response = {
      data: contact,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await getCustomerContacts(customerGIDMock)).toEqual(response);
  });

  it('should get Customer Orders when called', async () => {
    const response = {
      data: mockOrders,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await getCustomerOrders(customerGIDMock)).toEqual(response);
  });

  it('should get Customer Order details when called', async () => {
    const response = {
      data: mockOrders[mockFirstOrderId],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await getCustomerOrderDetails(customerGIDMock, mockFirstOrderId)).toEqual(response);
  });

  it('should get Customer Appointments when called', async () => {
    const response = {
      data: [mockPastAppointment, mockUpcomingAppointmentId],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await getCustomerAppointments(customerGIDMock)).toEqual(response);
  });

  it('should Review quote when reviewQuote is called', async () => {
    const quoteSecret = quoteMock[0].secret;
    const response = {
      data: null,
      status: 200,
      statusText: 'OK',
      headers: '',
      config: {},
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await reviewQuote(customerGIDMock, quoteSecret)).toEqual(response);
  });

  it('should Review quote when reviewQuoteApproval is called', async () => {
    const quoteSecret = quoteMock[0].secret;
    const response = {
      data: '',
      status: 200,
      statusText: 'OK',
      headers: '',
      config: {},
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await reviewQuoteApproval(customerGIDMock, quoteSecret)).toEqual(response);
  });

  it('should approve quote when approveQuoteApproval is called', async () => {
    const quoteSecret = quoteMock[0].secret;
    const response = {
      data: '',
      status: 200,
      statusText: 'OK',
      headers: '',
      config: {},
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await approveQuoteApproval(customerGIDMock, quoteSecret)).toEqual(response);
  });

  it('should Update Customer Signoff requirement when updateCustomerSignOffRequirement is called', async () => {
    const quoteSecret = quoteMock[0].secret;
    const response = {
      data: {
        signoff_img: '',
        signoff_by: '1',
        signoff_at: new Date().toDateString(),
        signoff_pdf: '',
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await updateCustomerSignOffRequirement(customerGIDMock, quoteSecret)).toEqual(response);
  });

  it('should update Customer Contacts when updateCustomerContacts is called', async () => {
    const response = {
      data: '',
      status: 200,
      statusText: 'OK',
      headers: '',
      config: {},
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(utils, 'request').mockImplementation((): any => () => {
      return response;
    });

    expect(await updateCustomerContacts(customerGIDMock, {})).toEqual(response);
  });
});
