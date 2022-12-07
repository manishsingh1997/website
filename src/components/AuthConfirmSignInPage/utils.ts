import {useMemo} from 'react';

import {AuthState} from '../../flux/reducers/auth';

export enum AuthConfirmationStep {
  LoggedIn = 'LoggedIn',
  Verifying = 'Verifying',
  Resending = 'Resending',
  LinkSent = 'LinkSent',
  ExpiredError = 'ExpiredError',
  InvalidError = 'InvalidError',
  UnknownError = 'UnknownError',
};

export const getAuthConfirmationStep = (auth: AuthState): AuthConfirmationStep => {
  if (auth.user) {
    return AuthConfirmationStep.LoggedIn;
  }

  if (auth.isAuthLoading || auth.isUserLoading) {
    return AuthConfirmationStep.Verifying;
  }
  if (auth.isResendLinkLoading) {
    return AuthConfirmationStep.Resending;
  }
  if (auth.isResendLinkSuccess) {
    return AuthConfirmationStep.LinkSent;
  }

  if (auth.authError?.data.otp?.errorCode === 'expired') {
    return AuthConfirmationStep.ExpiredError;
  }
  if (auth.authError?.data.otp?.errorCode === 'invalid') {
    return AuthConfirmationStep.InvalidError;
  }
  if (auth.authError || auth.resendLinkError) {
    return AuthConfirmationStep.UnknownError;
  }

  // Auth is considered not valid by default
  return AuthConfirmationStep.InvalidError;
};

export const useAuthConfirmationStep = (auth: AuthState) => {
  return useMemo(() => getAuthConfirmationStep(auth), [auth]);
};
