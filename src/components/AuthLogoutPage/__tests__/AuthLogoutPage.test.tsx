import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import {mockLoggedInAuth, mockNotLoggedInAuth, mockLoggedOutAuth} from '../__mocks__/mockAuth';
import AuthLogoutPage from '../AuthLogoutPage';

jest.mock('../../../components/common/Success', () => () => {
  const Success = "You'll be redirected to home page shortly";
  return Success;
});

describe('Should test the Auth Logout Page', () => {
  test('Should find the logout confirmation', () => {
    const mockProps = {
      auth: mockLoggedInAuth,
      logout: () => null,
    };
    render(
      <BrowserRouter>
        <AuthLogoutPage {...mockProps}/>
      </BrowserRouter>
    );
    
    const confirmationButton = screen.getByText('Yes, Logout');
    expect(confirmationButton).toBeInTheDocument();
  });
  
  test('Should find the not logged in warning', () => {
    const mockProps = {
      auth: mockNotLoggedInAuth,
      logout: () => null,
    };
    render(
      <BrowserRouter>
        <AuthLogoutPage {...mockProps}/>
      </BrowserRouter>
    );

    const notLoggedInWarning = screen.getByText('Sorry, you are not signed it yet');
    expect(notLoggedInWarning).toBeInTheDocument();
  });
  
  test('Should find the successfully logged out message', () => {
    const mockProps = {
      auth: mockLoggedOutAuth,
      logout: () => null,
    };
    render(
      <BrowserRouter>
        <AuthLogoutPage {...mockProps}/>
      </BrowserRouter>
    );
    
    const successfullyLoggedOutMessage = screen.getByText("You'll be redirected to home page shortly");
    expect(successfullyLoggedOutMessage).toBeInTheDocument();
  });
});