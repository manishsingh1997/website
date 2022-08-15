import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import AppOrderListPage from '../';
import {store} from '../../__mocks__/mockStore';
import {AppOrdersListPageProps} from '../types';
import {mockOrders} from '../__mocks__/mockOrders';

jest.mock('@ergeon/core-components', () => ({
  ...jest.requireActual('@ergeon/core-components'),
  googleIntegration: {getGoogleLoader: jest.fn()},
}));

describe('AppOrderListPage component', () => {
  it('Should render loading state', () => {
    const mockProps: AppOrdersListPageProps = {
      getOrders: jest.fn,
      isListLoading: true,
      listError: null,
      orders: [],
    };
    render(
      <Provider store={store}>
        <AppOrderListPage {...mockProps} />
      </Provider>
    );
    const loader = screen.queryByTestId('loader-image');
    expect(loader).not.toBeNull();
  });

  it('Should render empty list', () => {
    const mockProps: AppOrdersListPageProps = {
      getOrders: jest.fn,
      isListLoading: false,
      listError: null,
      orders: [],
    };
    render(
      <Provider store={store}>
        <AppOrderListPage {...mockProps} />
      </Provider>
    );
    const loader = screen.queryByTestId('loader-image');
    expect(loader).toBeNull();
    const orders = screen.getByText('Orders');
    expect(orders).not.toBeNull();
  });

  it('Should render orders', async () => {
    const mockProps: AppOrdersListPageProps = {
      getOrders: jest.fn,
      isListLoading: false,
      listError: null,
      orders: mockOrders,
      selectedHouse: mockOrders[0].house,
    };
    render(
      <Router history={createMemoryHistory()}>
        <AppOrderListPage {...mockProps} />
      </Router>
    );

    const loader = screen.queryByTestId('loader-image');
    const orderedAt = screen.queryByText('Apr 26, 2022');
    const orderList = await screen.findAllByText('Ordered on');
    const orderAddress = screen.queryByText('300 Wood Falls Ct, Roseville, CA 95678, USA');

    expect(loader).toBeNull();
    expect(orderList).toHaveLength(1);
    expect(orderedAt).not.toBeNull();
    expect(orderAddress).not.toBeNull();
  });
});
