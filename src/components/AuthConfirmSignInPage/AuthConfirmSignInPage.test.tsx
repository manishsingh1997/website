import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import faker from '@faker-js/faker';

import {initialAuthState} from '../../flux/reducers/auth';
import AuthConfirmSignInPage from './index';

// Replaces the original implementation of `setTimeout()` and other timer functions
jest.useFakeTimers();

// Run react-router-dom without wrapping into a <Router />
jest.mock('react-router-dom', () => ({
  Link: jest.fn(({ to }) => `Link to ${to}`),
  Redirect: jest.fn(({ to }) => `Redirect to ${to}`),
}));

// Auto-mocks Success component
// NOTE: the component has a circular dependency inside it that makes 3D-lib constants undefined.
jest.mock('../../components/common/Success');

// Generate minimal fake `window.location`
const fakeLocation = (otpCode?: string) => {
  if (otpCode) {
    return {search: `?code=${otpCode}`};
  }
  return {search: ''};
};

describe('AuthConfirmSignInPage', () => {
  let authenticateUserWithCode: ReturnType<typeof jest.fn>;
  let resendLink: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    authenticateUserWithCode = jest.fn();
    resendLink = jest.fn();
  });

  it('should render ”verifying code” by default', () => {
    render(
      <AuthConfirmSignInPage
        auth={initialAuthState}
        authenticateUserWithCode={authenticateUserWithCode}
        location={fakeLocation()}
        resendLink={resendLink} />
    );

    expect(
      screen.getByText('Verifying the link, please wait')
    ).toBeInTheDocument();
  });

  it('should authenticate', () => {
    const otpCode = faker.datatype.uuid();

    render(
      <AuthConfirmSignInPage
        auth={initialAuthState}
        authenticateUserWithCode={authenticateUserWithCode}
        location={fakeLocation(otpCode)}
        resendLink={resendLink} />
    );

    expect(authenticateUserWithCode).toHaveBeenCalledWith(otpCode);
  });

  it('should render successful authentication', () => {
    const userGID = faker.datatype.uuid();

    render(
      <AuthConfirmSignInPage
        auth={{
          ...initialAuthState,
          isAuthLoading: false,
          isUserLoading: false,
          user: {gid: userGID},
          userSetByCode: true,
        }}
        authenticateUserWithCode={authenticateUserWithCode}
        location={fakeLocation()}
        resendLink={resendLink} />
    );

    expect(
      screen.getByText("You'll be redirected shortly")
    ).toBeInTheDocument();

    // Force redirect timeout execution
    jest.runAllTimers();

    expect(
      screen.getByText(`Redirect to /app/${userGID}/orders`)
    ).toBeInTheDocument();
  });

  it('should render failed authentication', () => {
    const authInvalidError = {data: {otp: {errorCode: 'invalid'}}};
    const authExpiredError = {data: {otp: {errorCode: 'expired'}}};
    const authUnexpectedError = {statusCode: 500, data: {}};

    const {rerender} = render(
      <AuthConfirmSignInPage
        auth={{
          ...initialAuthState,
          isAuthLoading: false,
          isUserLoading: false,
          authError: authInvalidError,
        }}
        authenticateUserWithCode={authenticateUserWithCode}
        location={fakeLocation()}
        resendLink={resendLink} />
    );

    expect(
      screen.getByText('Sorry, but the link is not valid')
    ).toBeInTheDocument();

    rerender(
      <AuthConfirmSignInPage
        auth={{
          ...initialAuthState,
          isAuthLoading: false,
          isUserLoading: false,
          authError: authExpiredError,
        }}
        authenticateUserWithCode={authenticateUserWithCode}
        location={fakeLocation()}
        resendLink={resendLink} />
    );

    expect(
      screen.getByText(
        'Sorry, but the link you have used was already expired. Try to resend a confirmation email.'
      )
    ).toBeInTheDocument();

    rerender(
      <AuthConfirmSignInPage
        auth={{
          ...initialAuthState,
          isAuthLoading: false,
          isUserLoading: false,
          authError: authUnexpectedError,
        }}
        authenticateUserWithCode={authenticateUserWithCode}
        location={fakeLocation()}
        resendLink={resendLink} />
    );

    expect(
      screen.getByText(
        `Sorry, unexpected error happened (${authUnexpectedError.statusCode}). Please try again.`
      )
    ).toBeInTheDocument();
  });

  it('should resend code', () => {
    const otpCode = faker.datatype.uuid();
    const authExpiredError = {data: {otp: {errorCode: 'expired'}}};

    render(
      <AuthConfirmSignInPage
        auth={{
          ...initialAuthState,
          isAuthLoading: false,
          isUserLoading: false,
          authError: authExpiredError,
        }}
        authenticateUserWithCode={authenticateUserWithCode}
        location={fakeLocation(otpCode)}
        resendLink={resendLink} />
    );

    fireEvent(screen.getByText('Resend'), new MouseEvent('click'));

    expect(resendLink).toHaveBeenCalledWith(otpCode);
  });

  it('should render ”resending code”', () => {
    render(
      <AuthConfirmSignInPage
        auth={{
          ...initialAuthState,
          isAuthLoading: false,
          isUserLoading: false,
          isResendLinkLoading: true,
        }}
        authenticateUserWithCode={authenticateUserWithCode}
        location={fakeLocation()}
        resendLink={resendLink} />
    );

    expect(
      screen.getByText('Resending the link, please wait')
    ).toBeInTheDocument();
  });
});
