import React from 'react';

import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {Router, MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {googleIntegration} from '@ergeon/core-components';
import {initialize, mockInstances} from '@googlemaps/jest-mocks';

import Layout from '../Layout';
import {store} from '../../__mocks__/mockStore';
import {mockLoggedInAuth, mockNotLoggedInAuth} from '../__mocks__/mockData';

const PHONE = '+1-202-555-0146';
const LEAD_ID = 'AdBh0inoUKGlH';
const mockLocation = document.location;
const layoutProps = {
  getCurrentUser: jest.fn(),
  phoneNumber: PHONE,
  auth: {
    ...mockLoggedInAuth,
  },
  location: {...mockLocation, search: '', pathname: `/app/${LEAD_ID}/request-quote/`},
  match: {params: {customerGid: LEAD_ID}, url: ''},
};

const newStore = {
  ...store,
  getState: () => ({
    address: {
      updateModalOpened: false,
      updateModalLead: {},
      updateModalValue: '',
      product: '',
    },
  }),
};

const CHILD_VALUE = 'CHILD_VALUE';

const CHILD = <div>{CHILD_VALUE}</div>;

const renderMockLayout = (props: typeof layoutProps) => (
  <Provider store={newStore}>
    <MemoryRouter>
      <Layout {...props}>{CHILD}</Layout>
    </MemoryRouter>
  </Provider>
);

describe('Layout', () => {
  beforeAll(() => {
    initialize();
    const {initGoogleLoader, ADDRESS_INPUT_LIBRARIES} = googleIntegration;
    initGoogleLoader('key', ADDRESS_INPUT_LIBRARIES);
  });

  afterAll(() => {
    mockInstances.clearAll();
  });

  test('Should show spinner indicator when fetching user data or authenticating user', () => {
    const props = {
      ...layoutProps,
      auth: {
        ...mockNotLoggedInAuth,
        isAuthLoading: true,
        isUserLoading: true,
      },
    };

    const {container} = render(renderMockLayout(props));

    const spinnerIndicator = container.getElementsByClassName('loader');

    expect(spinnerIndicator).toBeDefined();
  });

  test('Should show dropdown menu with user full name as title when we successfully fetch user data', () => {
    const fullName = 'Patti Cater';
    const props = {
      ...layoutProps,
      auth: {
        ...mockLoggedInAuth,
        user: {
          gid: mockLoggedInAuth.user?.gid || '',
          full_name: fullName,
        },
      },
    };

    const {getByText} = render(renderMockLayout(props));

    expect(getByText(fullName)).toBeInTheDocument();
  });

  test('Should show Sign In message when no user data available', () => {
    const props = {
      ...layoutProps,
      auth: {
        ...mockNotLoggedInAuth,
      },
    };

    const {getByText} = render(renderMockLayout(props));

    const text = getByText('Sign In');
    expect(text).toBeInTheDocument();
  });

  test('Should render Child Component', () => {
    const {getByText} = render(renderMockLayout(layoutProps));

    expect(getByText(CHILD_VALUE)).toBeInTheDocument();
  });

  test('While loading, and sign in icon is clicked on, it redirects to sign in route', async () => {
    const props = {
      ...layoutProps,
      auth: {
        ...mockNotLoggedInAuth,
        isAuthLoading: true,
        isUserLoading: true,
      },
    };
    const history = createBrowserHistory({
      basename: '/',
    });

    render(
      <Provider store={newStore}>
        <Router history={history}>
          <Layout {...props}>{CHILD}</Layout>
        </Router>
      </Provider>
    );

    const signInLink = screen.getByTestId(/sign-in-item/i);

    fireEvent.click(signInLink);

    const pathnameHasSignIn = history.location.pathname.includes('app/sign-in');
    expect(pathnameHasSignIn).toBeTruthy();
  });

  test('When on city pages, top panel phone number is not show', async () => {
    window.innerWidth = 360;
    window.dispatchEvent(new Event('resize'));

    const props = {
      ...layoutProps,
      auth: {
        ...mockNotLoggedInAuth,
        isAuthLoading: true,
        isUserLoading: true,
      },
    };

    render(
      <Provider store={newStore}>
        <MemoryRouter initialEntries={['/fences/cities/sacramento-county-sacramento-ca/']}>
          <Layout {...props}>{CHILD}</Layout>
        </MemoryRouter>
      </Provider>
    );

    const phoneNumber = await screen.queryByText(/1-888-ERGEON1/);
    expect(phoneNumber).not.toBeInTheDocument();
  });
});
