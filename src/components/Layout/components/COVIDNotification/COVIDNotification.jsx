import {React, useMemo} from 'react';

import {EmergencyNotification} from '@ergeon/core-components';

const policyUrl = `${process.env.HOME_PAGE}/help/202000377`;

const COVIDNotification = (props) => {
  const {location} = props;

  const isHomePage = useMemo(() => {
    return location.pathname === '/';
  }, [location]);

  if (!isHomePage) {
    return null;
  }

  return <EmergencyNotification policyUrl={policyUrl} />;
};

export default COVIDNotification;
