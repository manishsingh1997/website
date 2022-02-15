import React from 'react';

const ErrorField = ({error}: {error: string}) => {
  return error?.length ? <p className="Form-error">{error}</p> : null;
};

export default ErrorField;
