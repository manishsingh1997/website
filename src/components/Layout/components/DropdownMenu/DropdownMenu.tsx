import React from 'react';

import {AuthState} from '../../../../flux/reducers/auth';

import LoadingDropdownMenu from './LoadingDropdownMenu';
import MainDropdownMenu from './MainDropdownMenu';
import AuthDropdownMenu from './AuthDropdownMenu';

import '../../index.scss';

interface DropdownMenuProps {
  auth: Partial<AuthState>;
  onGetQuoteClick?(): void;
}

const DropdownMenu = (props: DropdownMenuProps) => {
  const {auth: {isAuthLoading, isUserLoading, user}, onGetQuoteClick} = props;

  if (isUserLoading || isAuthLoading) {
    return <LoadingDropdownMenu />;
  }

  if (user) {
    return <MainDropdownMenu user={user} />;
  }

  return <AuthDropdownMenu onGetQuoteClick={onGetQuoteClick} />;
};

export default DropdownMenu;
