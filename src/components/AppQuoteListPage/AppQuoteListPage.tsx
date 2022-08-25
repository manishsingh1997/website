import React, {useCallback} from 'react';

import AppPage from '../../components/common/AppPage';

const AppQuoteListPage = () => {
  const renderHeader = useCallback(() => {
    return <>Quotes</>;
  }, []);

  return <AppPage error={null} isLoading={false} renderContent={() => <></>} renderHeader={renderHeader} />;
};

export default AppQuoteListPage;
