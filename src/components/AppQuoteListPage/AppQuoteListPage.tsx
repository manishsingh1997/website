import React, {useCallback} from 'react';

import AppPage from '../../components/common/AppPage';

import QuoteListPageHeader from './QuoteListPageHeader';

const AppQuoteListPage = () => {
  const renderHeader = useCallback(() => {
    return <QuoteListPageHeader />;
  }, []);

  return <AppPage error={null} isLoading={false} renderContent={() => <></>} renderHeader={renderHeader} />;
};

export default AppQuoteListPage;
