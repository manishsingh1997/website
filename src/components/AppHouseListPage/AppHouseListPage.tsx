import {Notification} from '@ergeon/core-components';
import React, {Fragment, useCallback, useContext} from 'react';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import AppPage from '../../components/common/AppPage';
import HouseCard from './HouseCard';
import {HouseType} from '../types';

import './index.scss';

export type AppHouseListPageProps = {
  getHouses: (customerGID: number) => void,
  houses: HouseType[],
  isListLoading: boolean,
  listError: null | []
}

const AppHouseListPage = (props: AppHouseListPageProps) => {
  const {getHouses, houses, listError, isListLoading} = props;

  const customerGID = useContext(CustomerGIDContext);

  const fetchData = useCallback(() => {
    getHouses(customerGID);
  }, [customerGID]);

  const renderContent = useCallback(() => {
    const isEmptyHouseList = !houses || houses.length === 0;
    if (isEmptyHouseList) {
      return (
        <Notification
          mode="embed"
          type="Information">
          There are no houses associated with your account yet.
        </Notification>
      )
    }
    return (
      <Fragment>
        {houses.map((house, index) =>
          <HouseCard house={house} houseNumber={index + 1} key={`house-${house.id}`}/>)}
      </Fragment>
    );
  }, [houses]);

  return (
    <AppPage
      className="house-list-page"
      error={listError}
      fetchData={fetchData}
      isLoading={isListLoading}
      renderContent={renderContent}
      renderHeader={() => 'Houses'}
    />
  )
}

export default AppHouseListPage;
