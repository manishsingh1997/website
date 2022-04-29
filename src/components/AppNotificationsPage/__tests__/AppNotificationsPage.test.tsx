import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import AppNotificationsPage from '../index';
import * as axios from '../__mocks__/axios';

jest.mock('../__mocks__/axios');

describe('App notifications page', () => {

  const location = { search: '', pathname: '' };
  const TEST_ACCOUNT = 'testemail@ergeon.com';
  const BUTTON_TEXT = 'Update preferences';
  const SUCCESS_MESSAGE = 'Notifications preferences updated successfully';

  test('Should return correct email, update preferences and render correctly', async () => {

    const {getByText} = render(
      <AppNotificationsPage location={location} />
    );

    await waitFor(() => {
      const email = getByText(TEST_ACCOUNT);
      expect(email).toBeInTheDocument();
    }, {timeout: 3000});

    fireEvent.click(getByText(BUTTON_TEXT));

    await waitFor(() => {
      const successMessage = getByText(SUCCESS_MESSAGE);
      expect(successMessage).toBeInTheDocument();
    });

  });

  test('Should return error interface and render correctly', () => {
    // @ts-ignore
    axios.default = null;
    const {queryByTestId} = render(
      <AppNotificationsPage location={location} />
    );

    const error = queryByTestId('error');
    expect(error).toBeInTheDocument();
  });

});