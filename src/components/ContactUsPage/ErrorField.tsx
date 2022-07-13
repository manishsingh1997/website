import React from 'react';

const ErrorField = ({error}: {error: string}) => {
  return error ? <p className="Form-error">{error}</p> : null;
};

export default ErrorField;
