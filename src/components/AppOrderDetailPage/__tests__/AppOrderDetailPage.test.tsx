import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import {
  mockOrders,
  mockFirstOrderId,
} from '../__mocks__/mockOrders';

import AppOrderDetailPage from '../index';

const CUSTOMER_GID = 'ABC1234567890';

const fakeMatch = () => {
  return {
    isExact: true,
    params: { orderId: mockFirstOrderId },
    path: `/app/${CUSTOMER_GID}/orders/:orderId`,
    url: `/app/${CUSTOMER_GID}/orders/${mockFirstOrderId}`,
  };
};

describe('Rendering of App Order Detail Page', () => {
  it('should render component loading', () => {
    render(
      <Router history={createMemoryHistory()}>
        <AppOrderDetailPage
          error={null}
          fetchOrder={() => mockOrders[mockFirstOrderId]}
          isLoading={true}
          match={fakeMatch()}
          orders={{}}
        />
      </Router>
    );
    const loader = screen.queryByTestId('loader-image');

    expect(loader).not.toBeNull();
  });

  it('should render component with Order', () => {
    render(
      <Router history={createMemoryHistory()}>
        <AppOrderDetailPage
          error={null}
          fetchOrder={() => mockOrders[mockFirstOrderId]}
          isLoading={false}
          match={fakeMatch()}
          orders={mockOrders}
        />
      </Router>
    );
    const loader = screen.queryByTestId('loader-image');
    const title = screen.queryByText('Fence Installation');
    const orderId = screen.queryByText(`#${mockFirstOrderId}`);
    const status = screen.queryByText('Cancelled');
    const orderedOn = screen.queryByText('Nov 19, 2021');
    // @ts-ignore
    const address = screen.queryByText(mockOrders[mockFirstOrderId].house.address.formatted_address);

    expect(loader).toBeNull();
    expect(title).not.toBeNull();
    expect(orderId).not.toBeNull();
    expect(status).not.toBeNull();
    expect(address).not.toBeNull();
    expect(orderedOn).not.toBeNull();
  });

  it('should render component with error', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    render(
      <Router history={createMemoryHistory()}>
        <AppOrderDetailPage
          error={{ reason: 'ERROR!!!!' }}
          fetchOrder={() => mockOrders[mockFirstOrderId]}
          isLoading={false}
          match={fakeMatch()}
          orders={mockOrders}
        />
      </Router>
    );

    const loader = screen.queryByTestId('loader-image');
    const error = screen.queryByTestId('error');

    expect(loader).toBeNull();
    expect(error).not.toBeNull();
    consoleWarnMock.mockRestore();
  });
});
