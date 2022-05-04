import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Success from '../../common/Success';
import {AUTH_LOGOUT_SUCCESS_DELAY} from '../constants';

const LogoutSuccess = () => {
  const [redirect, setRedirect] = useState(false);

  setTimeout(() => setRedirect(true), AUTH_LOGOUT_SUCCESS_DELAY);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return <Success header="Hope to see you soon!" text="You'll be redirected to home page shortly" />;
}

export default LogoutSuccess;
