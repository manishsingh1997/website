import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {googleIntegration, Places} from '@ergeon/core-components';
import {MemoryRouter} from 'react-router-dom';
import {initialize, mockInstances} from '@googlemaps/jest-mocks';

import * as api from '../../../api/lead';
import AddressUpdatePopup, {AddressUpdatePopupProps} from '../components/AddressUpdatePopup/AddressUpdatePopup';
import {leadData, productAvailabilityData} from '../__mocks__/mockData';
import {mockGoogle, mockPlace} from '../__mocks__/googlePlacesMock';
import * as leadUtil from '../utils';
import {Lead} from '../../types';

const {parsePlace} = Places;

const mockProductAvailabilityData = productAvailabilityData;

const mockUpdateLeadWithZipcode = (lead: Lead) => {
  return lead;
};

const mockGetCheckedZIP = () => {
  return Promise.resolve({
    data: mockProductAvailabilityData,
    status: 200,
    statusText: 'OK',
    headers: '',
    config: {},
  });
};

jest.spyOn(api, 'getCheckedZIP').mockImplementation(mockGetCheckedZIP);
jest.spyOn(leadUtil, 'updateLeadWithZipcode').mockImplementation(mockUpdateLeadWithZipcode);

jest.mock('utils/analytics', () => ({
  trackAddressEntered: jest.fn(),
}));

jest.mock('@googlemaps/js-api-loader', () => ({
  Loader: class {
    load() {
      return Promise.resolve(mockGoogle);
    }
  },
}));

const addressUpdatePopupProps: AddressUpdatePopupProps = {
  closeAddressUpdatePopup: jest.fn(),
  open: true,
  product: 'fence-replacement',
  updateLead: jest.fn(),
  updateModalLead: jest.fn(),
  updateModalValue: jest.fn(),
};

describe('AddressUpdatePopup component', () => {
  beforeEach(() => {
    initialize();
    const {initGoogleLoader, ADDRESS_INPUT_LIBRARIES} = googleIntegration;
    initGoogleLoader('key', ADDRESS_INPUT_LIBRARIES);
  });

  afterEach(() => {
    mockInstances.clearAll();
    jest.restoreAllMocks();
  });

  test('should call updateModalValue on input value change', async () => {
    const value = 'john doe';
    waitFor(() => {
      render(
        <MemoryRouter>
          <AddressUpdatePopup {...addressUpdatePopupProps} />
        </MemoryRouter>
      );

      const input = screen.getByRole('textbox');

      fireEvent.change(input, {target: {value}});
    });

    expect(addressUpdatePopupProps.updateModalValue).toBeCalledWith(value);
  });

  test('should call closeAddressUpdatePopup on Cancel button clicked', () => {
    waitFor(() => {
      render(
        <MemoryRouter>
          <AddressUpdatePopup {...addressUpdatePopupProps} />
        </MemoryRouter>
      );
    });

    const cancelButton = screen.getByText(/Cancel/i);

    fireEvent.click(cancelButton);

    expect(addressUpdatePopupProps.closeAddressUpdatePopup).toBeCalled();
  });

  test('should not call updateLead when we do not have lead and Update Address button is clicked', () => {
    waitFor(() => {
      render(
        <MemoryRouter>
          <AddressUpdatePopup {...addressUpdatePopupProps} />
        </MemoryRouter>
      );
    });

    const updateAddressButton = screen.getByText(/Update Address/i);

    fireEvent.click(updateAddressButton);

    expect(addressUpdatePopupProps.updateLead).not.toBeCalled();
  });

  test('should call updateLead when we have lead and Update Address button is clicked', () => {
    waitFor(() => {
      render(
        <MemoryRouter>
          <AddressUpdatePopup {...addressUpdatePopupProps} lead={leadData} />
        </MemoryRouter>
      );
    });

    const updateAddressButton = screen.getByText(/Update Address/i);

    fireEvent.click(updateAddressButton);

    expect(addressUpdatePopupProps.updateLead).toBeCalledWith(leadData);
  });

  test('should call updateModalLead with lead data when address is selected from google places', async () => {
    const lead = {
      address: parsePlace(mockPlace),
      product_slug: addressUpdatePopupProps.product,
      productAvailability: productAvailabilityData,
    };

    waitFor(() => {
      render(
        <MemoryRouter>
          <AddressUpdatePopup {...addressUpdatePopupProps} />
        </MemoryRouter>
      );
    });

    expect(addressUpdatePopupProps.updateModalLead).toBeCalledWith(lead);
  });

  test('should call closeAddressUpdatePopup when we click on the cancel icon', () => {
    waitFor(() => {
      render(
        <MemoryRouter>
          <AddressUpdatePopup {...addressUpdatePopupProps} />
        </MemoryRouter>
      );
    });

    const closeIcon = screen.getByTestId(/close-icon-id/i);

    fireEvent.click(closeIcon);

    expect(addressUpdatePopupProps.closeAddressUpdatePopup).toBeCalled();
  });
});
