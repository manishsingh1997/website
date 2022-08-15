import React from 'react';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import AppLayout from '../index';
import {mockLoggedInAuth, mockNotLoggedInAuth} from '../../AuthLogoutPage/__mocks__/mockAuth';
import {AppLayoutProps} from '../types';

const LEAD_ID = 'AdBh0inoUKGlH';
const LOADER_TEST_ID = 'loader-image';
const mockLocation = document.location;
const appLayoutProps: AppLayoutProps = {
  auth: {
    ...mockLoggedInAuth,
  },
  location: {...mockLocation, search: '', pathname: `/app/${LEAD_ID}`},
  match: {params: {customerGid: LEAD_ID}, url: ''},
  addHouse: () => null,
  getHouses: () => null,
  houses: [],
  selectedHouse: null,
  setSelectedHouse: () => null,
};

// Run react-router-dom without wrapping into a <Router />
jest.mock('react-router-dom', () => ({
  Link: jest.fn(({to}) => `Link to ${to}`),
  NavLink: jest.fn(({to}) => `NavLink to ${to}`),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/request-quote',
  }),
  useHistory: jest.fn().mockReturnValue({}),
}));

describe('App Layout page', () => {
  test('Should show loader when fetching user data', async () => {
    const props = {
      ...appLayoutProps,
      auth: {
        ...mockNotLoggedInAuth,
        isAuthLoading: true,
        isUserLoading: true,
      },
    };

    const {queryByTestId} = render(<AppLayout {...props} />);

    const testId = queryByTestId(LOADER_TEST_ID);
    expect(testId).toBeInTheDocument();
  });

  test('Should render UserError component', () => {
    const props = {
      ...appLayoutProps,
      auth: {
        ...mockNotLoggedInAuth,
        userError: 'An Error occured',
      },
    };
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    const {getByText} = render(<AppLayout {...props} />);

    const text = getByText('Sorry, but something went wrong');
    expect(text).toBeInTheDocument();
    expect(consoleErrorMock).toBeCalled();
    consoleErrorMock.mockRestore();
  });

  test('Should render AnonymousUser component', () => {
    const props = {
      ...appLayoutProps,
      auth: {
        ...mockNotLoggedInAuth,
      },
    };

    const {getByText} = render(<AppLayout {...props} />);

    const text = getByText('Not signed in');
    expect(text).toBeInTheDocument();
  });

  test('Should render Quotepage component', () => {
    const props = {
      ...appLayoutProps,
      location: {...mockLocation, search: '', pathname: `/app/${LEAD_ID}/quotes/direct`},
    };

    const {getByText} = render(
      <AppLayout {...props}>
        <div>Test Quote</div>
      </AppLayout>
    );

    const text = getByText('Test Quote');
    expect(text).toBeInTheDocument();
  });

  test('Should render Notifications component', () => {
    const props = {
      ...appLayoutProps,
      location: {...mockLocation, search: '', pathname: `/app/${LEAD_ID}/settings/`},
    };

    const {getByText} = render(
      <AppLayout {...props}>
        <div>Test Notifications</div>
      </AppLayout>
    );

    const text = getByText('Test Notifications');
    expect(text).toBeInTheDocument();
  });
});
