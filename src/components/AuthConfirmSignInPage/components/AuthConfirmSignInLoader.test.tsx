import React from 'react';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import AuthConfirmSignInLoader from './AuthConfirmSignInLoader';

describe('AuthConfirmSignInLoader', () => {
  it('should match snapshot', () => {
    render(
      <div data-testid="container">
        <AuthConfirmSignInLoader>Verifying the link, please wait</AuthConfirmSignInLoader>
      </div>
    );

    expect(
      screen.getByText('Verifying the link, please wait')
    ).toBeInTheDocument();
  });
});
