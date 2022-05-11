import React from 'react';
import {render, screen} from '@testing-library/react';
import {Button} from '@ergeon/core-components';
import '@testing-library/jest-dom';

import AuthConfirmSignInError from './AuthConfirmSignInError';

describe('AuthConfirmSignInError', () => {
  it('should match snapshot', () => {
    render(
      <div data-testid="container">
        <AuthConfirmSignInError
          desc="Sorry, but the link you have used was already expired."
          icon="test.jpg"
          title="Expired Link">
            <Button>Resend</Button>
        </AuthConfirmSignInError>
      </div>
    );

    expect(screen.getByText('Expired Link')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, but the link you have used was already expired.')
    ).toBeInTheDocument();
    expect(screen.getByText('Resend')).toBeInTheDocument();
  });
});
