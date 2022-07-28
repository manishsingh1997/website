import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {googleIntegration} from '@ergeon/core-components';
import {initialize, mockInstances} from '@googlemaps/jest-mocks';
import locationIcon from '@ergeon/core-components/src/assets/location-icon.svg';

import AddressPopup from '../components/AddressPopup';
import {PopUpAction} from '../components/AddressPopup/AddressPopup';

const props = {
  disabled: false,
  handleAddressChange: jest.fn(),
  handleAddressSelected: jest.fn(),
  handleAddressSubmit: jest.fn(),
  handleClose: jest.fn(),
  actionType: PopUpAction.LeadUpdate,
};

jest.mock('@ergeon/core-components', () => ({
  ...jest.requireActual('@ergeon/core-components'),
}));

describe('Should render AddressPopup', () => {
  beforeAll(() => {
    initialize();
    const {initGoogleLoader, ADDRESS_INPUT_LIBRARIES} = googleIntegration;
    initGoogleLoader('key', ADDRESS_INPUT_LIBRARIES);
  });

  afterAll(() => {
    mockInstances.clearAll();
  });

  it('should render with correct default title', () => {
    render(<AddressPopup {...props} />);
    expect(screen.getByText('Update your address')).toBeInTheDocument();
  });
  it('should render with correct default submit text', () => {
    render(<AddressPopup {...props} />);
    expect(screen.getByText('Update address')).toBeInTheDocument();
  });
  it('should render with button disabled when disabled is true', () => {
    render(<AddressPopup {...props} disabled />);
    const button = screen.getByRole('button', {name: 'Update address'});
    expect(button).toHaveAttribute('disabled');
  });
  it('should call handleClose when cancel button is clicked ', () => {
    render(<AddressPopup {...props} />);
    expect(props.handleClose).toHaveBeenCalledTimes(0);
    const button = screen.getByRole('button', {name: 'Cancel'});
    fireEvent.click(button);
    expect(props.handleClose).toHaveBeenCalledTimes(1);
  });
  it('should rneder with icon ', () => {
    render(<AddressPopup {...props} icon={locationIcon} />);
    const icon = screen.getByTestId('popup-icon');
    expect(icon).toBeInTheDocument();
  });
});
