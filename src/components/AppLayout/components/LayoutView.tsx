import React, {ReactNode} from 'react';

import AppLoader from '../../common/AppLoader';
import CustomerGIDContext from '../../../context-providers/CustomerGIDContext';
import {MatchProps} from '../types';

interface LayoutViewProps {
  children?: ReactNode;
  isLoading: boolean;
  match: MatchProps;
}

const LayoutView = (props: LayoutViewProps) => {
  const {match, isLoading, children} = props;

  if (isLoading) {
    return <AppLoader />;
  }

  return <CustomerGIDContext.Provider value={match.params.customerGid}>{children}</CustomerGIDContext.Provider>;
};

export default LayoutView;
