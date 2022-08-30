import React, {useCallback, useContext} from 'react';

import AppPage from '../../components/common/AppPage';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';

import QuoteListPageContent from './QuoteListPageContent';
import QuoteListPageHeader from './QuoteListPageHeader';
import {AppQuoteListPageProps} from './types';

const AppQuoteListPage = (props: AppQuoteListPageProps) => {
  const {quotes, listError, isListLoading, getQuotes} = props;

  const customerGID = useContext(CustomerGIDContext);

  const fetchData = useCallback(() => {
    getQuotes(customerGID);
  }, [getQuotes, customerGID]);

  const renderHeader = useCallback(() => {
    return <QuoteListPageHeader />;
  }, []);

  const renderContent = useCallback(() => {
    return quotes && <QuoteListPageContent quotes={quotes} />;
  }, [quotes]);

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
