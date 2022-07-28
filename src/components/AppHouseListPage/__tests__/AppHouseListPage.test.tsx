import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {googleIntegration} from '@ergeon/core-components';
import {initialize, mockInstances} from '@googlemaps/jest-mocks';

import {mockHouseA, mockHouseB} from '../../__mocks__/mockHouses';
import AppHouseListPage from '../AppHouseListPage';
import {store} from '../../__mocks__/mockStore';

jest.mock('@ergeon/core-components', () => ({
  ...jest.requireActual('@ergeon/core-components'),
}));

describe('Should test the App House List Page', () => {
  beforeAll(() => {
    initialize();
    const {initGoogleLoader, ADDRESS_INPUT_LIBRARIES} = googleIntegration;
    initGoogleLoader('key', ADDRESS_INPUT_LIBRARIES);
  });

  afterAll(() => {
    mockInstances.clearAll();
  });
  test('Should find the house number, address, label and header on the page', () => {
    const mockProps = {
      houses: [mockHouseA],
      isListLoading: false,
      listError: null,
      getHouses: () => [mockHouseA],
      addHouse: jest.fn(),
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
      addHouse: jest.fn(),
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
      addHouse: jest.fn(),
    };
    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );
    const notification = screen.getByText('There are no houses associated with your account yet.');
    expect(notification).toBeInTheDocument();
  });

  test('Should render the add address modal when "add address" button is clicked', async () => {
    const mockProps = {
      houses: [],
      isListLoading: false,
      isPopupOpen: false,
      listError: null,
      getHouses: () => [],
      addHouse: jest.fn(),
    };

    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );

    const addButton = screen.getByRole('button', {name: 'Add address'});
    fireEvent.click(addButton);

    const label = screen.getByText(/Street address/i);
    const submitButton = screen.getByRole('button', {name: 'Add'});
    expect(label).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('Should render the edit address modal when "edit" button is clicked', async () => {
    const mockProps = {
      houses: [mockHouseB],
      isListLoading: false,
      isPopupOpen: false,
      listError: null,
      getHouses: () => [],
      addHouse: jest.fn(),
    };

    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );

    const editButton = screen.getByRole('button', {name: 'Edit'});
    fireEvent.click(editButton);

    const heading = screen.getByText(/Edit address/i);
    const submitButton = screen.getByRole('button', {name: 'Save'});
    expect(heading).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('Should call Next feature alert when remove button is clicked', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    const mockProps = {
      houses: [mockHouseB],
      isListLoading: false,
      isPopupOpen: false,
      listError: null,
      getHouses: () => [],
      addHouse: jest.fn(),
    };

    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );

    const removeButton = screen.getByRole('button', {name: 'Remove'});
    fireEvent.click(removeButton);

    expect(alertMock).toHaveBeenCalledWith('Next feature');
  });

  test('Should call Next feature alert when edit confirmation button is clicked', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    const mockProps = {
      houses: [mockHouseB],
      isListLoading: false,
      isPopupOpen: false,
      listError: null,
      getHouses: () => [],
      addHouse: jest.fn(),
    };

    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );

    const editButton = screen.getByRole('button', {name: 'Edit'});
    fireEvent.click(editButton);

    const textField = screen.getByRole('textbox');
    fireEvent.change(textField, {target: {value: '13th Street. 47 W 13th St, New York, NY 10011, USA'}});

    const submitButton = screen.getByRole('button', {name: 'Save'});
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Next feature');
  });

  test('Should call addHouse when submit the popup with valid address ', async () => {
    const mockProps = {
      houses: [],
      isListLoading: false,
      isPopupOpen: false,
      listError: null,
      getHouses: () => [],
      addHouse: jest.fn(),
    };

    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );

    const addButton = screen.getByRole('button', {name: 'Add address'});
    fireEvent.click(addButton);

    const submitButton = screen.getByRole('button', {name: 'Add'});
    fireEvent.click(submitButton);
    waitFor(() => {
      expect(mockProps.addHouse).toBeCalledTimes(0);
    });
    const textField = screen.getByRole('textbox');
    fireEvent.change(textField, {target: {value: '13th Street. 47 W 13th St, New York, NY 10011, USA'}});

    fireEvent.click(submitButton);
    waitFor(() => {
      expect(mockProps.addHouse).toBeCalledTimes(1);
    });
  });

  test('Should close the popup when Cancel button is clicked', () => {
    const mockProps = {
      houses: [],
      isListLoading: false,
      isPopupOpen: true,
      listError: null,
      getHouses: () => [],
      addHouse: jest.fn(),
    };

    render(
      <Provider store={store}>
        <AppHouseListPage {...mockProps} />
      </Provider>
    );

    const cancelButton = screen.getByRole('button', {name: 'Cancel'});
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });
});
