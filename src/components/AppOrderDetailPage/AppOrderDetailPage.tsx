import React, { useContext, useState, useCallback, useMemo } from 'react';
import { DEFAULT_QUOTE_FILTER } from '../../utils/app-order';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import AppPage from '../../components/common/AppPage';
import OrderDetailHeader from './OrderDetailHeader';
import OrderDetail from './OrderDetail';
import { Order, SelectedOption } from './types';

import './index.scss';

type AppOrderDetailPageProps = {
  error?: Error,
  fetchOrder: (customerGID: string, orderId: number) => void,
  isLoading: boolean,
  match: {
    params: { orderId: number }
  },
  orders: Record<number, Order>,
};

const AppOrderDetailPage = (props: AppOrderDetailPageProps) => {
  const { error, fetchOrder, isLoading, match, orders } = props;
  const { orderId } = match.params;
  const customerGID = useContext(CustomerGIDContext);
  const [selectedOption, setSelectedOption] = useState<SelectedOption>(DEFAULT_QUOTE_FILTER);

  const fetchData = useCallback(() => {
    fetchOrder(customerGID, orderId);
  }, [customerGID, orderId]);

  const order = useMemo(() => {
    return orders[orderId];
  }, [orders, orderId]);

  const renderHeader = useCallback(() => {
    return (
      <OrderDetailHeader
        customerGID={customerGID}
        order={order}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption} />
    );
  }, [customerGID, order, selectedOption]);

  const renderContent = useCallback(() => {
    return (
      <OrderDetail
        customerGID={customerGID}
        order={order}
        selectedOption={selectedOption} />
    );
  }, [order, selectedOption, customerGID]);

  return (
    <AppPage
      className="order-detail-page"
      error={error}
      fetchData={fetchData}
      isLoading={isLoading}
      renderContent={renderContent}
      renderHeader={renderHeader}
    />
  );
}

export default AppOrderDetailPage;
