import React, { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Button } from '@ergeon/core-components';
import { formatDate, formatDateAndTime } from '../../utils/date';
import {
  filterQuotesByStatus,
  formatPrice,
} from '../../utils/app-order';
import { DRIVEWAY_QUANTITY_UNIT, FENCE_QUANTITY_UNIT } from '../../website/constants';
import DataRow from '../common/DataRow';

import AppSubCard from '../common/AppSubCard';
import AppConfigPreview from '../common/AppConfigPreview';
import { Order, Quote, Visits } from '../types';
import { getFormattedAddress } from '../../utils/app-house';
import { getQuoteDetailURL } from '../../utils/urls';
import { getExpiresAtTitle } from '../../utils/utils';
import { SelectedOption } from './types';

type OrderDetailsProps = {
  order: Order,
  selectedOption: SelectedOption,
  customerGID: string,
}

const OrderDetail = (props: OrderDetailsProps) => {
  const { order, selectedOption, customerGID } = props;

  const renderListElementContent = useCallback((quote: Quote) => {
    const schemaCodeUrl = quote.preview_quote_line?.config.schema_code_url;

    const showTotalLength = Boolean(quote.total_length) && quote.total_length !== '0';
    const showTotalArea = Boolean(quote.total_area) && quote.total_area !== '0';
    const expiresAt = quote.expires_at;
    const expiresAtTitle = getExpiresAtTitle(expiresAt);

    return (
      <>
        <div className="flex-wrapper">
          <div>
            <DataRow title="Status" value={quote.status.label} />
            <DataRow title="Total Price" value={formatPrice(quote.total_price)} />
            {showTotalLength && (
              <DataRow title="Total length" value={`${quote.total_length} ${FENCE_QUANTITY_UNIT}`} />
            )}
            {showTotalArea && <DataRow title="Total area" value={`${quote.total_area} ${DRIVEWAY_QUANTITY_UNIT}`} />}
            <DataRow title="Sent At" value={formatDateAndTime(quote.sent_to_customer_at)} />
            {quote.approved_at && <DataRow title="Approved At" value={formatDateAndTime(quote.approved_at)} />}
            {quote.cancelled_at && <DataRow title="Cancelled At" value={formatDateAndTime(quote.cancelled_at)} />}
            {expiresAt && <DataRow title={expiresAtTitle} value={formatDateAndTime(expiresAt)} />}
          </div>
          <div>
            <AppConfigPreview className="quote-preview" schemaCodeUrl={schemaCodeUrl} withLink />
          </div>
        </div>
        <div>
          <Link className="spacing left__is-10" to={getQuoteDetailURL(customerGID, quote.secret)}>
            <Button size="large" type="submit">
              View Full Quote
            </Button>
          </Link>
        </div>
      </>
    );
  }, [customerGID]);

  const renderListElementHeader = (quote: Quote) => {
    return (
      <>
        <div>{`Quote #${quote.id}`}</div>
      </>
    );
  }

  const renderVisitDates = (visits: Visits[]) => {
    return visits.map((visit) => (
      <Fragment key={`visit-${visit.id}`}>
        {formatDate(visit.estimated_start_time)}
        <br />
      </Fragment>
    ));
  }

  if (order) {
    return (
      <>
        <div className="order-details">
          <Helmet>
            <title key={Math.random()}>
              {`Order #${order.id}, ${order.product.name}, ${formatDate(order.ordered_at)}`}
            </title>
          </Helmet>
          <DataRow title="Order" value={`#${order.id}`} />
          <DataRow title="Status" value={order.customer_deal_status} />
          <DataRow title="Ordered on" value={formatDate(order.ordered_at)} />
          <DataRow title="Visit Dates" value={renderVisitDates(order.visits)} />
          <DataRow title="Address" value={getFormattedAddress(order.house)} />
          {/* TODO: ENG-8768 Add data row with order contract url */}
        </div>
        {filterQuotesByStatus(order.quotes, selectedOption).map((quote: Quote) => (
          <AppSubCard
            key={`quote-${quote.id}`}
            renderContent={() => renderListElementContent(quote)}
            renderHeader={() => renderListElementHeader(quote)}
          />
        ))}
      </>
    );
  }

  return null;
}

export default OrderDetail;
