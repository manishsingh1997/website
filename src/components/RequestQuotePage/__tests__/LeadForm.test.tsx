import React from 'react'
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import LeadForm from '../LeadForm';
import { leadData, selectedConfigs } from '../__mocks__/mockData';
import { mockLoggedInAuth } from '../../AuthLogoutPage/__mocks__/mockAuth';

const leadFormProps = {
    configs: selectedConfigs,
    lead:leadData,
    mobileAddressField: null,
    onAddConfigClick: jest.fn,
    onProductChange: jest.fn,
    onSubmit: jest.fn,
    product: 'fence-replacement',
    user: mockLoggedInAuth.user,
}

jest.mock('@ergeon/erg-utms', () => ({
  ...jest.requireActual('@ergeon/erg-utms'),
  getBaseEventData: () => ({}),
}));

jest.mock('../../../utils/analytics', () => ({
  ...jest.requireActual('../../../utils/analytics'),
  trackError: jest.fn,
  track: jest.fn,
  trackTawkLeadEvent: jest.fn,
  identify: jest.fn
}));

describe.only('LeadForm', () => {
  it('should allow input for all text fields', () => {
    render(<LeadForm {...leadFormProps} />);

    const nameInput = screen.getByLabelText('Your name') as HTMLInputElement
    expect(nameInput.value).toBe('')
    fireEvent.change(nameInput, {target: {value: 'John Doe'}})
    expect(nameInput.value).toBe('John Doe')

    const phoneInput = screen.getByLabelText('Your phone number') as HTMLInputElement
    expect(phoneInput.value).toBe('')
    fireEvent.change(phoneInput, {target: {value: 5555555555}})
    expect(phoneInput.value).toBe('(555) 555-5555')

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    expect(emailInput.value).toBe('')
    fireEvent.change(emailInput, {target: {value: 'test@gmail.com'}})
    expect(emailInput.value).toBe('test@gmail.com')
  });

    it('should not allow letters for phone to be inputted', () => {
      render(<LeadForm {...leadFormProps} />);
      const input = screen.getByLabelText('Your phone number') as HTMLInputElement
      expect(input.value).toBe('')
      fireEvent.change(input, {target: {value: 'test'}})
      expect(input.value).toBe('(___) ___-____')
    })

    it('should validate changes on Submit', () => {
      render(<LeadForm {...leadFormProps} />);
      expect(screen.queryByText('This field is required')).toBeNull();
      fireEvent.click(screen.getByRole('button', {name: /Get a quote/ }));
      expect(screen.queryAllByText('This field is required').length).toBe(3);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      fireEvent.change(emailInput, {target: {value: 'test'}})
      expect(screen.queryByText('Email format is user@example.com')).toBeInTheDocument();

      fireEvent.change(emailInput, {target: {value: 'test@gmail.com'}})
      const nameInput = screen.getByLabelText('Your name') as HTMLInputElement
      fireEvent.change(nameInput, {target: {value: 'John Doe'}})
  
      const phoneInput = screen.getByLabelText('Your phone number') as HTMLInputElement
      fireEvent.change(phoneInput, {target: {value: 5555555555}})
      fireEvent.click(screen.getByRole('button', {name: /Get a quote/ }));

      expect(screen.queryAllByText('This field is required').length).toBe(0);
      expect(screen.queryByText('Email format is user@example.com')).not.toBeInTheDocument();
    })
});
