import React from 'react';

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {googleIntegration} from '@ergeon/core-components';
import {initialize, mockInstances} from '@googlemaps/jest-mocks';

import AppInstallerQuotePage from '../../../containers/AppInstallerQuotePage';
import * as api from '../../../api/app';
import * as appOrderUtils from '../../../utils/app-order';
import {GetQuoteFailed, GetApprovedQuoteSuccess, GetCancelledQuoteSuccess} from '../__mocks__/api/index';
import mockQuote from '../../AppCustomerQuotePage/__mocks__/data/ApprovedQuote';
import {store} from '../../__mocks__/mockStore';

const mockLocation = document.location;
const secret = 'W8C5V0zBVqQQt3hk';
const gid = 'BkU5j7FtBtxjkEAU';
const props = {
  location: {...mockLocation, search: '', pathname: `/app/${gid}/quote-approvals/${secret}/`},
  match: {
    path: '',
    params: {
      secret,
    },
  },
};

const newStore = {
  ...store,
  getState: () => ({
    auth: {
      user: {
        gid,
      },
    },
  }),
};

jest.mock('@ergeon/draw-map', () => () => <></>);
jest.mock('../../../components/common/AppQuoteComponents/BuildSpecs', () => () => <></>);

const mockGetApprovedQuoteSuccess = () => {
  jest.spyOn(api, 'getQuoteDetails').mockImplementation(GetApprovedQuoteSuccess);
};

const mockGetCancelledQuoteSuccess = () => {
  jest.spyOn(api, 'getQuoteDetails').mockImplementation(GetCancelledQuoteSuccess);
};

const mockGetQuoteFailed = (status: number) => {
  jest.spyOn(api, 'getQuoteDetails').mockImplementation(() => GetQuoteFailed(status));
};

describe('AppInstallerQuotePage', () => {
  beforeAll(() => {
    initialize();
    const {initGoogleLoader, ADDRESS_INPUT_LIBRARIES} = googleIntegration;
    initGoogleLoader('key', ADDRESS_INPUT_LIBRARIES);
  });

  afterAll(() => {
    mockInstances.clearAll();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const waitForLoaderToBeRemoved = async () => {
    const loader = screen.getByTestId(/loader-image/i);
    await waitForElementToBeRemoved(loader);
  };

  it('displays a loader on component mount', () => {
    mockGetApprovedQuoteSuccess();

    render(
      <MemoryRouter>
        <Provider store={newStore}>
          <AppInstallerQuotePage {...props} />
        </Provider>
      </MemoryRouter>
    );

    const loader = screen.getByTestId(/loader-image/i);

    expect(loader).toBeInTheDocument();
  });

  it('displays error title for error of 404 - page not found', async () => {
    mockGetQuoteFailed(404);

    render(
      <MemoryRouter>
        <Provider store={newStore}>
          <AppInstallerQuotePage {...props} />
        </Provider>
      </MemoryRouter>
    );

    await waitForLoaderToBeRemoved();

    const errorTitle = screen.getByText(/Page Not Found/i);

    expect(errorTitle).toBeInTheDocument();
  });

  it('displays error title for error of non 404 status Code', async () => {
    mockGetQuoteFailed(403);

    render(
      <MemoryRouter>
        <Provider store={newStore}>
          <AppInstallerQuotePage {...props} />
        </Provider>
      </MemoryRouter>
    );

    await waitForLoaderToBeRemoved();

    const errorTitle = screen.getByText(/There was an error trying to retrieve quote./i);

    expect(errorTitle).toBeInTheDocument();
  });

  it('displays error title for error of invalid address in quote', async () => {
    mockGetCancelledQuoteSuccess();

    jest.spyOn(appOrderUtils, 'isQuoteAddressValid').mockImplementation(() => false);

    render(
      <MemoryRouter>
        <Provider store={newStore}>
          <AppInstallerQuotePage {...props} />
        </Provider>
      </MemoryRouter>
    );

    await waitForLoaderToBeRemoved();

    const errorTitle = screen.getByText(/Quote Inconsistency/i);

    expect(errorTitle).toBeInTheDocument();
  });

  it('displays quote details', async () => {
    mockGetApprovedQuoteSuccess();

    render(
      <MemoryRouter>
        <Provider store={newStore}>
          <AppInstallerQuotePage {...props} />
        </Provider>
      </MemoryRouter>
    );

    await waitForLoaderToBeRemoved();

    const quoteID = screen.getByText(RegExp(`Quote #${mockQuote.quote.id}`, 'i'));

    expect(quoteID).toBeInTheDocument();
  });
});
