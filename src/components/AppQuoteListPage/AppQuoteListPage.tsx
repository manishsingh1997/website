import React, {useCallback, useContext, useState} from 'react';

import AppPage from '../../components/common/AppPage';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';

import QuoteListPageContent from './QuoteListPageContent';
import QuoteListPageHeader from './QuoteListPageHeader';
import {AppQuoteListPageProps} from './types';
import {CustomerQuoteViewPreference} from './constants';

const AppQuoteListPage = (props: AppQuoteListPageProps) => {
  const {quotes, listError, isListLoading, getQuotes} = props;

  const customerGID = useContext(CustomerGIDContext);
  const [customerViewPreference, setCustomerViewPreference] = useState<CustomerQuoteViewPreference>(
    CustomerQuoteViewPreference.Grid
  );

  const fetchData = useCallback(() => {
    getQuotes(customerGID);
  }, [getQuotes, customerGID]);

  const renderHeader = useCallback(() => {
    return <QuoteListPageHeader handleLocalStorageChange={setCustomerViewPreference} />;
  }, []);

  const renderContent = useCallback(() => {
    if (!quotes?.length) {
      return <div className="center error">There are no quotes.</div>;
    }

    return <QuoteListPageContent customerViewPreference={customerViewPreference} quotes={quotes} />;
  }, [quotes, customerViewPreference]);

  return (
    <AppPage
      error={listError}
      fetchData={fetchData}
      isLoading={isListLoading}
      renderContent={renderContent}
      renderHeader={renderHeader}
    />
  );
};

export default AppQuoteListPage;
