import React from 'react';

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {cloneDeep} from 'lodash';

import * as api from '../../../api/app';
import {GetQuoteFailed, GetQuoteSuccess} from '../__mocks__/api';
import AppQuoteDetailPage, {AppQuoteDetailPageProps} from '../AppQuoteDetailPage';

const installerPathname = 'installer';
const directPathname = 'direct';
const errorPathname = '404';
const secret = 'W8C5V0zBVqQQt3hk';
const defaultProps: AppQuoteDetailPageProps = {
  match: {
    params: {
      type: '',
      secret,
    },
  },
};

const mockGetQuoteDetailsSuccess = () => {
  jest.spyOn(api, 'getQuoteDetails').mockImplementation(GetQuoteSuccess);
};

const mockGetQuoteDetailsFailed = () => {
  jest.spyOn(api, 'getQuoteDetails').mockImplementation(GetQuoteFailed);
};

describe('AppQuoteDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const history = createBrowserHistory({
    basename: '/',
  });

  const waitForLoaderToBeRemoved = async () => {
    const loader = screen.getByTestId(/loader-image/i);
    await waitForElementToBeRemoved(loader);
  };

  const testPathname = (pathname: string) => {
    return RegExp(pathname, 'i').test(history.location.pathname);
  };

  it('displays a loader on component mount', () => {
    mockGetQuoteDetailsSuccess();

    render(
      <MemoryRouter>
        <AppQuoteDetailPage {...defaultProps} />
      </MemoryRouter>
    );

    const loader = screen.getByTestId(/loader-image/i);

    expect(loader).toBeInTheDocument();
  });

  it('redirects to 404 page when we have no quote and we have a quoteError', async () => {
    mockGetQuoteDetailsFailed();

    render(
      <Router history={history}>
        <AppQuoteDetailPage {...defaultProps} />
      </Router>
    );

    await waitForLoaderToBeRemoved();

    const pathnameHasErrorCode = testPathname(errorPathname);
    expect(pathnameHasErrorCode).toBeTruthy();
  });

  it('redirects to installer quote detail page', async () => {
    mockGetQuoteDetailsSuccess();
    const props = cloneDeep(defaultProps);
    props.match.params.type = installerPathname;

    render(
      <Router history={history}>
        <AppQuoteDetailPage {...props} />
      </Router>
    );

    await waitForLoaderToBeRemoved();

    const pathnameHasInstaller = testPathname(installerPathname);
    expect(pathnameHasInstaller).toBeTruthy();
  });

  it('redirects to customer quote preview page', async () => {
    const props = cloneDeep(defaultProps);
    props.match.params.type = directPathname;

    mockGetQuoteDetailsSuccess();

    render(
      <Router history={history}>
        <AppQuoteDetailPage {...props} />
      </Router>
    );

    await waitForLoaderToBeRemoved();

    const pathnameHasDirect = testPathname(directPathname);
    expect(pathnameHasDirect).toBeTruthy();
  });

  it('redirects to customer quote detail page', async () => {
    mockGetQuoteDetailsSuccess();

    render(
      <Router history={history}>
        <AppQuoteDetailPage {...defaultProps} />
      </Router>
    );

    await waitForLoaderToBeRemoved();

    const pathnameHasInstaller = testPathname(installerPathname);
    const pathnameHasDirect = testPathname(directPathname);

    expect(pathnameHasDirect).toBeFalsy();
    expect(pathnameHasInstaller).toBeFalsy();
  });
});
