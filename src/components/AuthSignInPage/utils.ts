import {ParsedAPIErrorType} from '../../utils/types';

import {AuthSignInErrors} from './types';

export const handleSignInError = (signInError: ParsedAPIErrorType) => {
  let errors: AuthSignInErrors | null = null;
  // TODO: move response formatting to erg-customer-auth-js
  const response = (signInError).response;
  if (
    response &&
    Number(response.status) < 500 &&
    response.data &&
    (response.data.identifier || response.data['non_field_errors'])
  ) {
    errors = {
      email: [response.data.identifier],
      global: response.data['non_field_errors'],
      ...response.data,
    };
  } else {
    console.error(signInError);
    errors = {global: ['Unexpected error, we are already notified about this.']};
  }
  return errors;
}
