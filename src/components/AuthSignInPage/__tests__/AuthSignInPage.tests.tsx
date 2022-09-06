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

    const submitButton = screen.getByText('Submit');
    const input = screen.getByLabelText('Please enter your email');
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
    const emailInput = screen.getByLabelText('Please enter your email');
    const signInButton = screen.getByText('Submit');
    const footerText = screen.getByText('We will send you an email with a verification link');

    expect(signInText).toBeInTheDocument();
    expect(quoteLink).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
  });

  it('should render sign in with next param', () => {
    window.history.pushState({}, '', '/app/sign-in/?next=/')

    render(
      <BrowserRouter>
        <AuthSignInPage />
      </BrowserRouter>
    );

    const signInText = screen.getByText('Looks like you’re not authenticated');
    const alternText = screen.getByText('View as guest');

    expect(signInText).toBeInTheDocument();
    expect(alternText).toBeInTheDocument();
  });
});
