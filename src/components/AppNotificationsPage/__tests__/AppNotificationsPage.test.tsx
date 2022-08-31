import React from 'react';

import {fireEvent, render, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import AppNotificationsPage from '../AppNotificationsPage';

jest.mock('../__mocks__/axios');

describe('App notifications page', () => {

  let mockLocation = document.location;
  const TEST_ACCOUNT = 'testemail@ergeon.com';
  const BUTTON_TEXT = 'Update preferences';
  const SUCCESS_MESSAGE = 'Settings updated successfully';

  it('Should return correct email, update preferences', async () => {
    render(<AppNotificationsPage location={mockLocation} />);
    await waitFor(() => {
      const email = screen.getByText(TEST_ACCOUNT);
      expect(email).toBeInTheDocument();
    }, {timeout: 100});
    fireEvent.click(screen.getByText(BUTTON_TEXT));
    await waitFor(() => {
      const successMessage = screen.getByText(SUCCESS_MESSAGE);
      expect(successMessage).toBeInTheDocument();
    });
  });
});
