import React from 'react';

import {Button, Spinner} from '@ergeon/core-components';
import classNames from 'classnames';

import {AuthLogoutPageProps} from '../types';

const LogoutConfirmation = ({auth, logout}: AuthLogoutPageProps) => {
  const { isAuthLoading, logoutError } = auth;

  return (
    <div className="center">
      <h4 className="spacing after__is-12">Logout</h4>
      <p className="spacing after__is-24">Are you sure you want to logout?</p>
      {logoutError && (
        <p className="error spacing after__is-12 small-text">Something unexpected happened, please try again</p>
      )}
      <Button
        className={classNames({ 'is-loading': isAuthLoading })}
        disabled={isAuthLoading}
        onClick={logout}
        size="large"
        type="submit"
      >
        {isAuthLoading ? <Spinner active={true} borderWidth={0.1} size={25} /> : 'Yes, Logout'}
      </Button>
    </div>
  )
}

export default LogoutConfirmation;
