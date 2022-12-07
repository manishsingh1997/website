import React, {useCallback, useContext, useMemo, useState} from 'react';

import AppPage from '../../components/common/AppPage';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';

import QuoteListPageContent from './QuoteListPageContent';
import QuoteListPageHeader from './QuoteListPageHeader';
import {AppQuoteListPageProps} from './types';
import {CustomerQuoteViewPreference} from './constants';
import useHouseQuotes from './useHouseQuotes';
import {quoteReponseFormatter} from './utils';

const AppQuoteListPage = (props: AppQuoteListPageProps) => {
  const {quotes, listError, isListLoading, selectedHouse, getQuotes} = props;

  const prettyQuotes = useMemo(() => {
    return quoteReponseFormatter(quotes);
  }, [quotes]);

  const houseQuotes = useHouseQuotes(prettyQuotes, selectedHouse);

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
    if (!houseQuotes?.length) {
      return <div className="center error">There are no quotes.</div>;
    }

    return <QuoteListPageContent customerViewPreference={customerViewPreference} quotes={houseQuotes} />;
  }, [houseQuotes, customerViewPreference]);

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
