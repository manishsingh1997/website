import React from 'react';

import AppCustomerQuotePage from '../AppCustomerQuotePage';
import {AppCustomerQuotePageProps} from '../AppCustomerQuotePage/types';
import AppPage from '../common/AppPage';

import './AppMenuCustomerQuotePage.scss';

const AppMenuCustomerQuotePage = (props: AppCustomerQuotePageProps) => {
  return (
    <AppPage
      isLoading={false}
      renderContent={() => (
        <div className="customer-quote-wrapper">
          <AppCustomerQuotePage {...props} quoteFallback={<div className="center error">No quote found.</div>} />
        </div>
      )}
    />
  );
};

export default AppMenuCustomerQuotePage;
