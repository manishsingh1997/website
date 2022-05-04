import React from 'react';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import AppLayout from '../index';
import {mockLoggedInAuth, mockNotLoggedInAuth} from '../../AuthLogoutPage/__mocks__/mockAuth';

const LEAD_ID = 'AdBh0inoUKGlH';
const LOADER_TEST_ID = 'loader-image';
const appLayoutProps = {
  auth: {
    ...mockLoggedInAuth,
  },
  location: {search: '', pathname: `/app/${LEAD_ID}`},
  match: {params: {customerGid: LEAD_ID}},
};

// Run react-router-dom without wrapping into a <Router />
jest.mock('react-router-dom', () => ({
  Link: jest.fn(({to}) => `Link to ${to}`),
  NavLink: jest.fn(({to}) => `NavLink to ${to}`),
}));

describe('App Layout page', () => {
  test('Should show loader when fetching user data', async () => {
    const props = {
      ...appLayoutProps,
      auth: {
        isAuthLoading: true,
        isUserLoading: true,
        user: null,
        userError: null,
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

    const {getByText} = render(<AppLayout {...props} />);

    const text = getByText('Sorry, but something went wrong');
    expect(text).toBeInTheDocument();
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
      location: {search: '', pathname: `/app/${LEAD_ID}/quotes/direct`},
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
      location: {search: '', pathname: `/app/${LEAD_ID}/notifications/`},
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
