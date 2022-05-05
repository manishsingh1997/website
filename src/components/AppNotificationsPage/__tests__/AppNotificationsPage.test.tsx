import React from 'react';
import {fireEvent, render, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import AppNotificationsPage from '../AppNotificationsPage';
import * as axios from '../__mocks__/axios';

jest.mock('../__mocks__/axios');

describe('App notifications page', () => {

  const mockLocation = document.location;
  const TEST_ACCOUNT = 'testemail@ergeon.com';
  const BUTTON_TEXT = 'Update preferences';
  const SUCCESS_MESSAGE = 'Notifications preferences updated successfully';

  test('Should return correct email, update preferences and render correctly', async () => {

    render(
      <AppNotificationsPage location={mockLocation} />
    );

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

  test('Should return error interface and render correctly', () => {
    // @ts-ignore
    axios.default = null;
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    render(
      <AppNotificationsPage location={mockLocation} />
    );

    const error = screen.queryByTestId('error');
    expect(error).toBeInTheDocument();
    consoleWarnMock.mockRestore();
  });
});
