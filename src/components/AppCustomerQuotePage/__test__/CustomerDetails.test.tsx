import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerDetails, {CustomerDetailsProps} from '../CustomerDetails';
import quoteApproval from '../__mocks__/data/quoteApproval';

const mockCustomerDetailsProps: CustomerDetailsProps = {
  customer: quoteApproval.customer,
  quote: {
    order: quoteApproval.quote.order,
  },
};

describe('Customer details', () => {
  test('Should display customer details', () => {
    render(<CustomerDetails {...mockCustomerDetailsProps} />);

    expectCustomerDetailsToBeVisible();
  });

  test('Should display a Collapsible Component', () => {
    const {container} = render(<CustomerDetails {...mockCustomerDetailsProps} />);

    const collapsible = container.getElementsByClassName('Collapsible');

    expect(collapsible).toBeDefined();
  });

  test('Should display customer details, when Collapsible component is expanded', () => {
    render(<CustomerDetails {...mockCustomerDetailsProps} />);

    const customerDetailsButton = screen.getByText('Customer details');

    fireEvent.click(customerDetailsButton);

    expectCustomerDetailsToBeVisible();
  });
});

const expectCustomerDetailsToBeVisible = () => {
  const {customer, quote} = quoteApproval;
  const customerAddress = customer.main_address?.formatted_address ?? quote.order.house.address.formatted_address;

  const fullName = screen.getByText(customer.full_name);
  const address = screen.getByText(customerAddress);
  const phone = screen.getByText(customer.phone_number);
  const email = screen.getByText(customer.email);

  expect(fullName).toBeVisible();
  expect(address).toBeVisible();
  expect(phone).toBeVisible();
  expect(email).toBeVisible();
};
