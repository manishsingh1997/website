import React, {useMemo, useState} from 'react';
import {DataRow, Collapsible} from '@ergeon/core-components';

import './CustomerDetails.scss';

type CustomerData = {
  id: number;
  full_name: string;
  phone_number: string;
  email: string;
}

type QuoteData = {
  order: {
    house: {
      address: {
        formatted_address: string;
      },
      customer: {
        main_address: {
          formatted_address: string;
        },
      }
    }
  }
}

type CustomerDetailsProps = {
  customer: CustomerData;
  quote: QuoteData;
};

const CustomerDetails = (props: CustomerDetailsProps) => {
  const {customer, quote} = props;
  const [isOpen, setIsOpen] = useState(false);

  const customerDetails = useMemo(() => {
    const house = quote.order.house;
    let {address} = house;
    if (!address) {
      address = house.customer.main_address;
    }
    return (
      <div className="CustomerDetails-Rows">
        <DataRow
          title="Customer"
          value={<>{customer.full_name} <span className="Quote-CustomerId">({customer.id})</span></>} />
        <DataRow title="Address" value={address.formatted_address} />
        <DataRow title="Phone" value={customer.phone_number} />
        <DataRow title="Email" value={customer.email} />
      </div>
    );
  }, [customer, quote.order.house]);

  return (
    <div className="CustomerDetails">
      <div className="desktop-length">
        {customerDetails}
      </div>
      <div className="mobile-length">
        <Collapsible
          isOpen={isOpen}
          onChangeOpen={() => setIsOpen(!isOpen)}
          title="Customer details">
          {customerDetails}
        </Collapsible>
      </div>
    </div>
  );
};

export default CustomerDetails;
