import React from 'react';
import {render, screen} from '@testing-library/react';
import NotificationMessage from '../components/NotificationMessage';
import {ParsedAPIErrorType} from '../../../utils/types';

describe('NotificationMessage component', () => {
  const UNSUBSCRIBE_BY_LINK = 'You were unsubscribed successfully';
  it('Should return correct notification message', () => {
    render(
      <NotificationMessage
        error={{data: {}} as ParsedAPIErrorType}
        isSavedSuccessfully={true}
        unsubscribeAutomatically={true} />
    );
    expect(screen.getByText(UNSUBSCRIBE_BY_LINK)).toBeDefined();
  });

});
