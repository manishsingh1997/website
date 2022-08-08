import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {calcUtils} from '@ergeon/3d-lib';
import {googleIntegration} from '@ergeon/core-components';
import {mockProps, mockAddress} from '../__mocks__/mockData';

import SimpleLeadForm from '../SimpleLeadForm';

describe('SimpleLeadForm tests', () => {
  beforeAll(() => {
    const {initGoogleLoader, ADDRESS_INPUT_LIBRARIES} = googleIntegration;
    initGoogleLoader(process.env.GOOGLE_MAPS_API_KEY, ADDRESS_INPUT_LIBRARIES);
  });

  beforeEach(() => {
    render(<SimpleLeadForm {...mockProps} />);
  });

  it('should render', () => {
    const nameInput = screen.queryByText('Name');
    const phoneEmailInput = screen.queryByText('Phone or email');
    const addressCity = screen.queryByText('Address');
    const select = screen.queryByText('Type of fence');

    expect(nameInput).not.toBeNull();
    expect(phoneEmailInput).not.toBeNull();
    expect(addressCity).not.toBeNull();
    expect(select).not.toBeNull();
  });

  it('should render with default values', () => {
    expect(screen.getByRole('textbox', {name: 'Name'})).toHaveValue('');
    expect(screen.getByRole('textbox', {name: 'Phone or email'})).toHaveValue('');
    expect(screen.getByRole('textbox', {name: 'Address'})).toHaveValue('');
    expect(screen.queryByText('Type of fence')).toBeInTheDocument();
  });

  it('should display errors when fields are empty', async () => {
    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Please enter your name')).not.toBeNull();
      expect(screen.getByText('Please enter your phone or email')).not.toBeNull();
      expect(screen.getByText('Please enter your address')).not.toBeNull();
    });
  });

  it('should display errors when email/phone is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox', {name: 'Phone or email'}), {
      target: {
        value: 'test',
      },
    });
    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid phone or email')).not.toBeNull();
    });
  });

  it('should not display errors when all fields are valid (email)', async () => {
    jest
      .spyOn(calcUtils, 'getParams')
      .mockImplementation(() => ({schema: 'test,test1,test2', code: 'test,test1,test2'}));

    fireEvent.input(screen.getByRole('textbox', {name: 'Name'}), {
      target: {
        value: 'test',
      },
    });

    fireEvent.input(screen.getByRole('textbox', {name: 'Phone or email'}), {
      target: {
        value: 'test@ergeon.com',
      },
    });
    fireEvent.input(screen.getByRole('textbox', {name: 'Address'}), {
      target: {
        value: '123 Palo Alto Ave, Palo Alto, CA 94301, USA',
      },
    });

    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.queryByText('Please enter your name')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter a valid phone or email')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter your address')).not.toBeInTheDocument();
    });
  });

  it('should not display errors when all fields are valid (phone)', async () => {
    jest
      .spyOn(calcUtils, 'getParams')
      .mockImplementation(() => ({schema: 'test,test1,test2', code: 'test,test1,test2'}));
    fireEvent.input(screen.getByRole('textbox', {name: 'Name'}), {
      target: {
        value: 'test',
      },
    });

    fireEvent.input(screen.getByRole('textbox', {name: 'Phone or email'}), {
      target: {
        value: '1234567890',
      },
    });
    fireEvent.input(screen.getByRole('textbox', {name: 'Address'}), {
      target: {
        value: '123 Palo Alto Ave, Palo Alto, CA 94301, USA',
      },
    });

    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.queryByText('Please enter your name')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter a valid phone or email')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter your address')).not.toBeInTheDocument();
    });
  });
});

describe('SimpleLeadForm - submit test', () => {
  const onSubmitSpy = jest.spyOn(mockProps, 'onSubmit');

  beforeAll(() => {
    const {initGoogleLoader, ADDRESS_INPUT_LIBRARIES} = googleIntegration;
    initGoogleLoader(process.env.GOOGLE_MAPS_API_KEY, ADDRESS_INPUT_LIBRARIES);
  });

  beforeEach(() => {
    // this should allow us to submit, mocking google places api was hell and I couldn't figure out how to mock it :(
    // so had to take a shortcut, if we have lead.address it will be used as our address object and raw_address string
    mockProps.lead = {address: mockAddress};
    render(<SimpleLeadForm {...mockProps} />);
  });

  it('should successfully submit form', async () => {
    jest
      .spyOn(calcUtils, 'getParams')
      .mockImplementation(() => ({schema: 'test,test1,test2', code: 'test,test1,test2'}));
    fireEvent.input(screen.getByRole('textbox', {name: 'Name'}), {
      target: {
        value: 'test',
      },
    });

    fireEvent.input(screen.getByRole('textbox', {name: 'Phone or email'}), {
      target: {
        value: '1234567890',
      },
    });
    fireEvent.input(screen.getByRole('textbox', {name: 'Address'}), {
      target: {
        value: '123 Palo Alto Avenue, Palo Alto, CA 94301',
      },
    });

    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalled();
    });
  });

  it('should successfully submit form (without message)', async () => {
    jest
      .spyOn(calcUtils, 'getParams')
      .mockImplementation(() => ({schema: 'test,test1,test2', code: 'test,test1,test2'}));
    fireEvent.input(screen.getByRole('textbox', {name: 'Name'}), {
      target: {
        value: 'test',
      },
    });

    fireEvent.input(screen.getByRole('textbox', {name: 'Phone or email'}), {
      target: {
        value: '1234567890',
      },
    });
    fireEvent.input(screen.getByRole('textbox', {name: 'Address'}), {
      target: {
        value: '123 Palo Alto Avenue, Palo Alto, CA 94301',
      },
    });

    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalled();
    });
  });
});
