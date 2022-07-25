import {render, screen} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {mockHouseA, mockHouseB} from '../../__mocks__/mockHouses';
import AppHouseListPage from '../AppHouseListPage';
import {store} from '../../__mocks__/mockStore';

jest.mock('@ergeon/core-components', () => ({
  ...jest.requireActual('@ergeon/core-components'),
  googleIntegration: {getGoogleLoader: jest.fn()},
}));

describe('Should test the App House List Page', () => {
  test('Should find the house number, address, label and header on the page', () => {
    const mockProps = {
      houses: [mockHouseA],
      isListLoading: false,
      listError: null,
      getHouses: () => [mockHouseA],
    };
    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );
    const houseAddressStreet = screen.getByRole('heading', {name: '300 Wood Falls Ct', level: 5});
    const houseAddressFinal = screen.getByRole('heading', {name: 'Roseville, CA 95678, USA', level: 6});
    const header = screen.getByText('Addresses');

    expect(header).toBeInTheDocument();
    expect(houseAddressStreet).toBeInTheDocument();
    expect(houseAddressFinal).toBeInTheDocument();
  });

  test('Should check properly listed multiple houses', () => {
    const mockProps = {
      houses: [mockHouseA, mockHouseB],
      isListLoading: false,
      listError: null,
      getHouses: () => [mockHouseA, mockHouseB],
    };
    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );
    const houseAddress1Street = screen.getByRole('heading', {name: '300 Wood Falls Ct', level: 5});
    const houseAddress2Street = screen.getByRole('heading', {name: '200 Wood Falls Ct', level: 5});
    const houseAddressFinal = screen.getAllByRole('heading', {name: 'Roseville, CA 95678, USA', level: 6});

    expect(houseAddress1Street).toBeInTheDocument();
    expect(houseAddress2Street).toBeInTheDocument();
    expect(houseAddressFinal).toHaveLength(2);
  });

  test('Should render error message if there is no house data', () => {
    const mockProps = {
      houses: [],
      isListLoading: false,
      listError: null,
      getHouses: () => [],
    };
    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );
    const notification = screen.getByText('There are no houses associated with your account yet.');
    expect(notification).toBeInTheDocument();
  });
});
