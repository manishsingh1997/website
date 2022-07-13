import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { calcUtils, CatalogType } from '@ergeon/3d-lib';
import { googleIntegration } from '@ergeon/core-components';

import SimpleLeadForm from '../SimpleLeadForm';

describe('SimpleLeadForm tests', () => {
  const mockProps = {
    onSubmit: () => jest.fn(),
    onProductChange: () => jest.fn(),
    lead: {},
    product: '',
    configs: [
      {
        catalog_type: CatalogType.FENCE,
        code: '',
        description: '',
        price: '',
        units: '',
        grade: '',
      }
    ],
    user: {
      email: '',
      full_name: '',
      phone_number: '',
    },
  };

  const onSubmitSpy = jest.spyOn(mockProps, 'onSubmit');

  beforeAll(() => {
    const { initGoogleLoader, ADDRESS_INPUT_LIBRARIES } = googleIntegration;
    initGoogleLoader(
      process.env.GOOGLE_MAPS_API_KEY,
      ADDRESS_INPUT_LIBRARIES,
    );
  });

  beforeEach(() => {
    render(<SimpleLeadForm {...mockProps} />);
  });

  it('should render', () => {
    const nameInput = screen.queryByText('Name');
    const phoneEmailInput = screen.queryByText('Phone or email');
    const addressCity = screen.queryByText('Address');
    const message = screen.queryByText('Message');

    expect(nameInput).not.toBeNull();
    expect(phoneEmailInput).not.toBeNull();
    expect(addressCity).not.toBeNull();
    expect(message).not.toBeNull();
  });

  it('should render with default values', () => {
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Phone or email' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Address' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('');
  });

  it('should display errors when fields are empty', async () => {
    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Please enter your name')).not.toBeNull();
      expect(screen.getByText('Please enter your phone or email')).not.toBeNull();
      expect(screen.getByText('Please enter your address')).not.toBeNull();
      expect(screen.getByText('Please enter a message')).not.toBeNull();
    });
  });

  it('should display errors when email/phone is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: 'Phone or email' }), {
      target: {
        value: 'test'
      }
    });
    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid phone or email')).not.toBeNull();
    });
  });

  it('should not display errors when all fields are valid (email)', async () => {
    jest.spyOn(calcUtils, 'getParams').mockImplementation(() =>
      ({ schema: 'test,test1,test2', code: 'test,test1,test2' }));

    fireEvent.input(screen.getByRole('textbox', { name: 'Name' }), {
      target: {
        value: 'test'
      }
    });

    fireEvent.input(screen.getByRole('textbox', { name: 'Phone or email' }), {
      target: {
        value: 'test@ergeon.com'
      }
    });
    fireEvent.input(screen.getByRole('textbox', { name: 'Address' }), {
      target: {
        value: '123 Palo Alto Ave, Palo Alto, CA 94301, USA'
      }
    });
    fireEvent.input(screen.getByRole('textbox', { name: 'Message' }), {
      target: {
        value: 'This is a message test'
      }
    });
    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.queryByText('Please enter your name')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter a valid phone or email')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter your address')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter a message')).not.toBeInTheDocument();
      expect(onSubmitSpy).toHaveBeenCalled();
    });
  });

  it('should not display errors when all fields are valid (phone)', async () => {
    jest.spyOn(calcUtils, 'getParams').mockImplementation(() =>
      ({ schema: 'test,test1,test2', code: 'test,test1,test2' }));
    fireEvent.input(screen.getByRole('textbox', { name: 'Name' }), {
      target: {
        value: 'test'
      }
    });

    fireEvent.input(screen.getByRole('textbox', { name: 'Phone or email' }), {
      target: {
        value: '1234567890'
      }
    });
    fireEvent.input(screen.getByRole('textbox', { name: 'Address' }), {
      target: {
        value: '123 Palo Alto Ave, Palo Alto, CA 94301, USA'
      }
    });
    fireEvent.input(screen.getByRole('textbox', { name: 'Message' }), {
      target: {
        value: 'This is a message test'
      }
    });
    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.queryByText('Please enter your name')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter a valid phone or email')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter your address')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter a message')).not.toBeInTheDocument();
      expect(onSubmitSpy).toHaveBeenCalled();
    });
  });
});
