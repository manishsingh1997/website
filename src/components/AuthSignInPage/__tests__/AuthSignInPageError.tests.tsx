import React from 'react';

import {BrowserRouter} from 'react-router-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import AuthSignInPage from '../index';

import '@testing-library/jest-dom';

jest.mock('../../../components/common/Success');

jest.mock('../../../utils/auth', () => ({
  ...jest.requireActual('../../../utils/auth'),
  authService: {
    requestOTP: jest.fn(() => {
      throw new Error();
    }),
  },
}));

describe('Rendering of Auth Sign In Page', () => {
  it('should show error', async () => {
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
      const error = screen.getByText('Unexpected error, we are already notified about this.');
      expect(error).toBeInTheDocument();
    });
  });
});
