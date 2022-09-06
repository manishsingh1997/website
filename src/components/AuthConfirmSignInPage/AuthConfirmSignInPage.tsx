import React, {SyntheticEvent, useCallback, useEffect, useMemo, useState} from 'react';

import {Link, Redirect} from 'react-router-dom';
import {Button} from '@ergeon/core-components';
import ErrorIcon from '@ergeon/core-components/src/assets/icon-error.svg';
import ExpiredLinkIcon from '@ergeon/core-components/src/assets/icon-expired-link.svg';
import InvalidLockIcon from '@ergeon/core-components/src/assets/icon-link-is-not-valid.svg';

import SingleCard from '../../components/common/SingleCard';
import Success from '../../components/common/Success';
import {AuthState} from '../../flux/reducers/auth';
import {getAuthOTPCode, getNextRedirectValue} from '../../utils/auth';

import AuthConfirmSignInError from './components/AuthConfirmSignInError';
import AuthConfirmSignInLoader from './components/AuthConfirmSignInLoader';
import {AuthConfirmationStep, useAuthConfirmationStep} from './utils';

const AUTH_CONFIRM_SIGN_IN_SUCCESS_DELAY = 2000;

export type AuthConfirmSignInPageProps = {
  auth: AuthState,
  authenticateUserWithCode(otpCode: string): void,
  location: Location,
  resendLink(otpCode: string): void,
};

const AuthConfirmSignInPage = (props: AuthConfirmSignInPageProps) => {
  const {auth, authenticateUserWithCode, location, resendLink} = props;

  const otpCode = useMemo(() => getAuthOTPCode(location.search), [location.search]);
  const next = useMemo(() => getNextRedirectValue(location.search), [location.search]);

  const authConfirmationStep = useAuthConfirmationStep(auth);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    resendLink(otpCode);
  }, [otpCode, resendLink]);

  useEffect(function authenticate() {
    if (otpCode) {
      authenticateUserWithCode(otpCode);
    }
  }, [authenticateUserWithCode, otpCode]);

  useEffect(function redirectOnSuccess() {
    if (AuthConfirmationStep.LoggedIn && !redirect) {
      const timeout = setTimeout(() => {
        setRedirect(true);
      }, AUTH_CONFIRM_SIGN_IN_SUCCESS_DELAY);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [authConfirmationStep, redirect]);

  switch (authConfirmationStep) {
    case AuthConfirmationStep.LoggedIn:
      if (!auth.user) break; // to default return
      if (!redirect) {
        return <Success header="Thanks for email confirmation!" text="You'll be redirected shortly" />;
      }
      return <Redirect to={next ?? `/app/${auth.user.gid}/orders`} />;

    case AuthConfirmationStep.Verifying:
      return <AuthConfirmSignInLoader>Verifying the link, please wait</AuthConfirmSignInLoader>;

    case AuthConfirmationStep.Resending:
      return <AuthConfirmSignInLoader>Resending the link, please wait</AuthConfirmSignInLoader>;

    case AuthConfirmationStep.LinkSent:
      return <Success header="We have sent you an email with a link to sign in" />;

    case AuthConfirmationStep.ExpiredError:
      return (
        <form onSubmit={handleSubmit}>
          <AuthConfirmSignInError
            desc="Sorry, but the link you have used was already expired. Try to resend a confirmation email."
            icon={ExpiredLinkIcon}
            title="Expired Link">
              <Button className="spacing before__is-12" size="large" type="submit">
                Resend
              </Button>
          </AuthConfirmSignInError>
        </form>
      );

    case AuthConfirmationStep.InvalidError:
      break; // to default return

    case AuthConfirmationStep.UnknownError: {
      const errorMsg = `Sorry, unexpected error happened (${auth?.authError?.statusCode}). Please try again.`;
      return <AuthConfirmSignInError icon={ErrorIcon} title={errorMsg} />;
    }

    default: {
      const notHandled: never = authConfirmationStep;
      console.error(`AuthConfirmationStep.${notHandled} is not handled`);
      break;  // to default return
    }
  }

  return (
    <AuthConfirmSignInError icon={InvalidLockIcon} title="Sorry, but the link is not valid">
      <Link to="/app/sign-in">
        <Button className="spacing before__is-12" size="large" type="submit">
          Sign In
        </Button>
      </Link>
    </AuthConfirmSignInError>
  );
};

const AuthConfirmSignInPageCard = (props: AuthConfirmSignInPageProps) => {
  return (
    <SingleCard
      className="confirm-signin-page"
      content={<AuthConfirmSignInPage {...props} />} />
  );
};

export default AuthConfirmSignInPageCard;
