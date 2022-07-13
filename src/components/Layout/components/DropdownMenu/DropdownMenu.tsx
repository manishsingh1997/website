import React from 'react';

import {AuthState} from '../../../../flux/reducers/auth';
import LoadingDropdownMenu from './LoadingDropdownMenu';
import MainDropdownMenu from './MainDropdownMenu';
import AuthDropdownMenu from './AuthDropdownMenu';

import '../../index.scss';

interface DropdownMenuProps {
  auth: Partial<AuthState>;
}

const DropdownMenu = (props: DropdownMenuProps) => {
  const {isAuthLoading, isUserLoading, user} = props.auth;

  if (isUserLoading || isAuthLoading) {
    return <LoadingDropdownMenu />;
  }

  if (user) {
    return <MainDropdownMenu user={user} />;
  }

  return <AuthDropdownMenu />;
};

export default DropdownMenu;
