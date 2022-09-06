import {Dispatch, FormEvent, useCallback, useMemo} from 'react';

import {createValidator, email as validatorEmail, internalUrl, required} from '../../utils/validation';

import {AuthSignInErrors} from './types';
import useRequestSignIn from './useRequestSignIn';

type UseHandleSubmitProps = {
  email: string,
  next?: string,
  setLoading: Dispatch<boolean>,
  setErrors: Dispatch<AuthSignInErrors>,
  setIsFormSuccess: Dispatch<boolean>,
};

const useHandleSubmit = ({email, next, setLoading, setErrors, setIsFormSuccess}: UseHandleSubmitProps) => {
  const requestSignIn = useRequestSignIn(setLoading);

  const validator = useMemo(() => createValidator({
    email: [required, validatorEmail],
  }), [required, validatorEmail]);

  return useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errors = validator({email}) as AuthSignInErrors;
    if (!errors) {
      errors = await requestSignIn(email, internalUrl(next) ? next : undefined);
    }
    if (errors) {
      setErrors(errors);
    } else {
      setIsFormSuccess(true);
    }
  }, [email, next]);
}

export default useHandleSubmit;
