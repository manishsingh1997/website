import React from 'react';

import {render} from '@testing-library/react';

import {CITIES_PAGE_PATH} from '../website/constants';

import Cities from './Cities';
import CustomerApp from './CustomerApp';

jest.mock('react-router-dom', () => ({
  Redirect: jest.fn(({ to }) => `Redirect to ${to} for`),
  Route: jest.fn(({ path, children }) => <>{`Route to ${path}`} {children}</>),
  Switch: jest.fn(({ children }) => children),
}));

jest.mock('../containers/AppLayout', () => ({children}) => children);
jest.mock('../containers/AppCityPage', () => ({children}) => children);
jest.mock('../containers/AppAppointmentsListPage', () => ({children}) => children);
jest.mock('../containers/AppContactsPage', () => ({children}) => children);
jest.mock('../containers/AppHouseListPage', () => ({children}) => children);
jest.mock('../containers/AppOrderDetailPage', () => ({children}) => children);
jest.mock('../containers/AppOrderListPage', () => ({children}) => children);
jest.mock('../containers/AppCustomerQuotePage', () => ({children}) => children);
jest.mock('../containers/AppInstallerQuotePage', () => ({children}) => children);
jest.mock('../containers/AppQuoteDetailPage', () => ({children}) => children);
jest.mock('../components/AppNotificationsPage', () => ({children}) => children);
jest.mock('../components/NotFoundPage', () => ({children}) => children);

describe('Routes', () => {
  test('Cities endpoints', () => {
    const {container} = render(
      <Cities location={{search: ''}} match={{url: CITIES_PAGE_PATH}} />
    );
    expect(container).toMatchSnapshot();
  });

  test('Customer app endpoints', () => {
    const {container} = render(
      <CustomerApp location={{}} match={{url: '/app/:customerGid'}} />
    );
    expect(container).toMatchSnapshot();
  });
});
