import React from 'react';

import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {act} from 'react-dom/test-utils';
import {googleIntegration} from '@ergeon/core-components';
import {initialize, mockInstances} from '@googlemaps/jest-mocks';
import cloneDeep from 'lodash/cloneDeep';

import AddressDropdown, {AddressDropdownProps} from '../components/AddressDropdown';
import {mockHouseA, mockHouseB} from '../../__mocks__/mockHouses';

const addressDropdownProps: AddressDropdownProps = {
  houses: [],
  selectedHouse: null,
  customerGID: 12,
  addHouse: jest.fn(),
  setSelectedHouse: jest.fn(),
};

const matcher = (string: string, options?: string) => new RegExp(string, options || '');

describe('AddressDropdown component', () => {
  beforeAll(() => {
    initialize();
    const {initGoogleLoader, ADDRESS_INPUT_LIBRARIES} = googleIntegration;
    initGoogleLoader('key', ADDRESS_INPUT_LIBRARIES);
  });
  
  afterAll(() => {
    mockInstances.clearAll();
    jest.restoreAllMocks();
  });

  const streetA = '300 Wood Falls Ct';
  const streetB = '200 Wood Falls Ct';
  const finalAddress = 'Roseville, CA 95678, USA';
  const fullAddressA = `${streetA}, ${finalAddress}`;
  const fullAddressB = `${streetB}, ${finalAddress}`;

  mockHouseA.address.formatted_address = fullAddressA;
  mockHouseB.address.formatted_address = fullAddressB;

  const props = cloneDeep(addressDropdownProps);

  const renderAddressDropdown = () => {
    render(<AddressDropdown {...props} houses={[mockHouseA, mockHouseB]} selectedHouse={mockHouseA} />);
  };

  const displayDropdown = () => {
    const dropdownTitle = screen.getByTestId(matcher('dropdown-title', 'i'));

    expect(screen.queryByText(matcher(streetB, 'i'))).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownTitle);
    });
  };

  const displayAddAddressPopup = () => {
    const addAddress = screen.getByTestId(matcher('item-add-address', 'i'));

    expect(screen.queryByText(matcher('Add address', 'i'))).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(addAddress);
    });
  };

  test('should display dropdown options when we click on house address', () => {
    renderAddressDropdown();

    displayDropdown();

    expect(screen.queryByText(matcher(streetB, 'i'))).toBeInTheDocument();
  });

  test('should display add address popup modal', () => {
    renderAddressDropdown();

    displayDropdown();
    displayAddAddressPopup();

    expect(screen.queryByText(matcher('Add address', 'i'))).toBeInTheDocument();
  });

  test('should dimiss add address popup modal when we cancel popup modal', () => {
    renderAddressDropdown();

    displayDropdown();
    displayAddAddressPopup();

    const cancelAddAddress = screen.getByRole('button', {name: matcher('Cancel', 'i')});

    expect(screen.queryByText(matcher('Add address', 'i'))).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelAddAddress);
    });

    expect(screen.queryByText(matcher('Add address', 'i'))).not.toBeInTheDocument();
  });

  test('should dismiss dropdown options when we click on house address item', () => {
    renderAddressDropdown();

    displayDropdown();

    const dropdownHouseAddress = screen.getByTestId(`item-${mockHouseB.id}`);

    expect(screen.queryByText(matcher(streetB, 'i'))).toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownHouseAddress);
    });

    expect(screen.queryByText(matcher(streetB, 'i'))).not.toBeInTheDocument();
  });
});
