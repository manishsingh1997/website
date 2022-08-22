import React from 'react';

import {BrowserRouter} from 'react-router-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import AuthSignInPage from '../index';

import '@testing-library/jest-dom';

jest.mock('../../../components/common/Success');

jest.mock('../../../utils/auth', () => ({
  ...jest.requireActual('../../../utils/auth'),
  authService: {requestOTP: jest.fn()},
}));

describe('Rendering of Auth Sign In Page', () => {
  it('should render success', async () => {
    render(
      <BrowserRouter>
        <AuthSignInPage />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Sign in with email');
    const input = screen.getByLabelText('Email');
    fireEvent.change(input, {target: {value: 'test@ergeon.com'}});
    fireEvent.click(submitButton);

    await waitFor(() => {
      const success = screen.getByText('We have sent you an email with a link to sign in');
      expect(success).toBeInTheDocument();
    });
  });

  it('should render SignIn form', () => {
    render(
      <BrowserRouter>
        <AuthSignInPage />
      </BrowserRouter>
    );

    const signInText = screen.getByText('Sign in to Ergeon');
    const quoteLink = screen.getByText('Request a quote');
    const emailInput = screen.getByLabelText('Email');
    const signInButton = screen.getByText('Sign in with email');
    const footerText = screen.getByText('We will send you an email with a link for sign in');

    expect(signInText).toBeInTheDocument();
    expect(quoteLink).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
  });
});
