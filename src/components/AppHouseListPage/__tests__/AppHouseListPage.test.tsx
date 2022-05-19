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
        <AppHouseListPage {...mockProps}/>
      </Provider>
    );
    const houseAddress = screen.getByText('300 Wood Falls Ct, Roseville, CA 95678, USA');
    const label = screen.getByText('Address');
    const header = screen.getByText('Houses');
    const houseNumber = screen.getByText('House #1');

    expect(houseAddress).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(houseNumber).toBeInTheDocument();
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
        <AppHouseListPage {...mockProps}/>
      </Provider>
    );
    const houseNumber1 = screen.getByText('House #1');
    const houseNumber2 = screen.getByText('House #2');
    const houseAddress1 = screen.getByText('300 Wood Falls Ct, Roseville, CA 95678, USA');
    const houseAddress2 = screen.getByText('200 Wood Falls Ct, Roseville, CA 95678, USA');
    expect(houseNumber1).toBeInTheDocument();
    expect(houseNumber2).toBeInTheDocument();
    expect(houseAddress1).toBeInTheDocument();
    expect(houseAddress2).toBeInTheDocument();
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
        <AppHouseListPage {...mockProps}/>
      </Provider>
    );
    const notification = screen.getByText('There are no houses associated with your account yet.');
    expect(notification).toBeInTheDocument();
  });

});
