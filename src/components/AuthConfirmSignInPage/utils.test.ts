import faker from '@faker-js/faker';

import {initialAuthState} from '../../flux/reducers/auth';
import {AuthConfirmationStep, getAuthConfirmationStep} from './utils';

describe('AuthConfirmSignInPage utils', () => {
  test('getAuthConfirmationStep', () => {
    const authInvalidError = {statusCode: 400, data: {otp: {errorCode: 'invalid'}}};
    const authExpiredError = {statusCode: 400, data: {otp: {errorCode: 'expired'}}};
    const authUnexpectedError = {statusCode: 500, data: {}};

    expect(getAuthConfirmationStep({
      ...initialAuthState,
      isUserLoading: false,
      user: {gid: faker.datatype.uuid()},
    })).toEqual(AuthConfirmationStep.LoggedIn);

    expect(getAuthConfirmationStep(
      initialAuthState
    )).toEqual(AuthConfirmationStep.Verifying);

    expect(getAuthConfirmationStep({
      ...initialAuthState,
      isAuthLoading: true,
      isUserLoading: false,
    })).toEqual(AuthConfirmationStep.Verifying);

    expect(getAuthConfirmationStep({
      ...initialAuthState,
      isResendLinkLoading: true,
      isUserLoading: false,
    })).toEqual(AuthConfirmationStep.Resending);

    expect(getAuthConfirmationStep({
      ...initialAuthState,
      isResendLinkLoading: false,
      isResendLinkSuccess: true,
      isUserLoading: false,
    })).toEqual(AuthConfirmationStep.LinkSent);

    expect(getAuthConfirmationStep({
      ...initialAuthState,
      authError: authInvalidError,
      isUserLoading: false,
    })).toEqual(AuthConfirmationStep.InvalidError);

    expect(getAuthConfirmationStep({
      ...initialAuthState,
      authError: authExpiredError,
      isUserLoading: false,
    })).toEqual(AuthConfirmationStep.ExpiredError);

    expect(getAuthConfirmationStep({
      ...initialAuthState,
      authError: authUnexpectedError,
      isUserLoading: false,
    })).toEqual(AuthConfirmationStep.UnknownError);

    expect(getAuthConfirmationStep({
      ...initialAuthState,
      isAuthLoading: false,
      isResendLinkLoading: false,
      isUserLoading: false,
    })).toEqual(AuthConfirmationStep.InvalidError);
  });
});
