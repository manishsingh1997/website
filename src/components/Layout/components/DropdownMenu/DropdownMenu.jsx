import React from 'react';

import LoadingDropdownMenu from './LoadingDropdownMenu';
import MainDropdownMenu from './MainDropdownMenu';
import AuthDropdownMenu from './AuthDropdownMenu';

import '../../index.scss';

const DropdownMenu = (props) => {
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
