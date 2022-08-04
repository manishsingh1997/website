import React, {Fragment, useCallback, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@ergeon/core-components';
import {formatDate} from '../../utils/date';
import {getOrderDetailURL, getQuoteDetailURL} from '../../utils/urls';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import DataRow from '../../components/common/DataRow';
import AppPage from '../../components/common/AppPage';
import AppSubCard from '../../components/common/AppSubCard';
import {filterQuotesByStatus, DEFAULT_QUOTE_FILTER} from '../../utils/app-order';
import {getFormattedAddress} from '../../utils/app-house';
import {Order, Quote} from '../types';
import {AppOrdersListPageProps} from './types';

const AppOrdersListPage = (props: AppOrdersListPageProps) => {
  const {getOrders, orders, listError, isListLoading} = props;
  const customerGID = useContext(CustomerGIDContext);

  const fetchData = useCallback(() => {
    getOrders(customerGID);
  }, [getOrders, customerGID])

  const renderQuote = useCallback((quote: Quote) => {
    return (
      <div key={`quote-${quote['id']}`}>
        <Link to={getQuoteDetailURL(customerGID, quote['secret'])}>#{quote['id']}</Link> ({quote['status']['label']})
      </div>
    );
  }, [getQuoteDetailURL, customerGID])

  const renderQuotes = useCallback((order: Order) => {
    const quotes = filterQuotesByStatus(order['quotes'], DEFAULT_QUOTE_FILTER);
    return quotes.length > 0 ? quotes.map((quote: Quote) => renderQuote(quote)) : null;
  }, [filterQuotesByStatus, renderQuote])

  const renderListElementHeader = useCallback((order: Order) => {
    return (
      <Fragment>
        <div>{order['product']['name']}</div>
        <div>
          <Link to={getOrderDetailURL(customerGID, order['id'])}>
            <Button flavor="cta" size="small" type="submit">
              Order Details
            </Button>
          </Link>
        </div>
      </Fragment>
    );
  }, [getOrderDetailURL, customerGID])

  const renderListElementContent = useCallback((order: Order) => {
    return (
      <Fragment>
        <DataRow title="Order" value={`#${order['id']}`} />
        <DataRow title="Status" value={order['customer_deal_status']} />
        <DataRow title="Ordered on" value={formatDate(order['ordered_at'])} />
        <DataRow title="Address" value={getFormattedAddress(order['house'])} />
        <DataRow title="Quotes" value={renderQuotes(order)} />
      </Fragment>
    );
  }, [formatDate, getFormattedAddress, renderQuotes])

  const renderHeader = useCallback(() => {
    return (
      <Fragment>
        <div>Orders</div>
      </Fragment>
    );
  }, [])

  const renderContent = useCallback(() => {
    return (
      <Fragment>
        {orders &&
          orders.map((order) => (
            <AppSubCard
              key={`order-${order.id}`}
              renderContent={() => renderListElementContent(order)}
              renderHeader={() => renderListElementHeader(order)}
            />
          ))}
      </Fragment>
    );
  }, [orders, renderListElementContent, renderListElementHeader])

  return (
    <AppPage
      error={listError}
      fetchData={fetchData}
      isLoading={isListLoading}
      renderContent={renderContent}
      renderHeader={renderHeader}
    />
  );
}

export default AppOrdersListPage;
