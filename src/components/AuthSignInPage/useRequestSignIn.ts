import {Dispatch, useCallback} from 'react';

import {authService} from '../../utils/auth';
import {ParsedAPIErrorType} from '../../utils/types';

import {handleSignInError} from './utils';

const useRequestSignIn = (setLoading: Dispatch<boolean>) => {
  return useCallback(async (email: string, next?: string) => {
    setLoading(true);
    let errors = null;
    try {
      await authService.requestOTP(email, 'email', next);
    } catch (signInError) {
      errors = handleSignInError(signInError as ParsedAPIErrorType);
    } finally {
      setLoading(false);
    }
    return errors;
  }, []);
}

export default useRequestSignIn;
