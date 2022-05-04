import React from 'react';
import SingleCard from '../../components/common/SingleCard';
import {AuthLogoutPageProps} from './types';
import AuthLogoutPage from './AuthLogoutPage';

const AuthLogoutPageCard = (props: AuthLogoutPageProps) => {
  return (
    <SingleCard content={<AuthLogoutPage {...props} />} />
  );
};

export default AuthLogoutPageCard;
