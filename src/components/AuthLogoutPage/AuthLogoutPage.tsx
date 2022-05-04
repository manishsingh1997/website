import React, {useMemo} from 'react';
import {AUTH_STATE} from './constants';
import LogoutConfirmation from './components/LogoutConfirmation';
import LogoutSuccess from './components/LogoutSuccess';
import NotLoggedIn from './components/NotLoggedIn';
import {AuthLogoutPageProps} from './types';
import {getAuthState} from './utils';

const AuthLogoutPage = (props: AuthLogoutPageProps) => {
  const { auth } = props;

  const authState = useMemo(() => getAuthState(auth), [auth]);

  switch (authState) {
    case AUTH_STATE.USER_LOGGED_OUT:
      return <LogoutSuccess/>;
    case AUTH_STATE.USER_NOT_LOGGED_IN:
      return <NotLoggedIn/>;
    default:
      return <LogoutConfirmation auth={props.auth} logout={props.logout}/>;
  }
};

export default AuthLogoutPage;
