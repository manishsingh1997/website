import React, { Dispatch, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { SelectFilter } from '@ergeon/core-components';
import contactIcon from '@ergeon/core-components/src/assets/icon-arrow-left.svg';
import { filterQuotesSentToCustomer, QUOTE_FILTERS } from '../../utils/app-order';
import { Order, SelectedOption } from './types';

type AppOrderDetailPageProps = {
  customerGID: string,
  order: Order,
  selectedOption: SelectedOption,
  setSelectedOption: Dispatch<SelectedOption>,
};

const OrderDetailHeader = (props: AppOrderDetailPageProps) => {
  const { customerGID, order, selectedOption, setSelectedOption } = props;

  const hasFilters = useMemo(() => (
    order && filterQuotesSentToCustomer(order.quotes).length !== 0
  ), [order]);

  return (
    <>
      <Link className="order-title" to={`/app/${customerGID}/orders`}>
        <div>
          <ReactSVG src={contactIcon} />
        </div>
        <div>{order?.product.name ?? null}</div>
      </Link>
      {hasFilters && (
        <div className="quote-filters">
          <SelectFilter
            className="react-select-filter-container"
            classNamePrefix="react-select-filter"
            name="quote_filter"
            onChange={setSelectedOption}
            options={QUOTE_FILTERS}
            value={selectedOption}
          />
        </div>
      )}
    </>
  );
}

export default OrderDetailHeader;
