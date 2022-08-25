import React from 'react';
import '@testing-library/jest-dom';

import {render, screen} from '@testing-library/react';

import AppQuoteListPage from '../AppQuoteListPage';

describe('render AppQuoteListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should header content to be in the document', async () => {
    render(<AppQuoteListPage />);

    expect(screen.getByRole('heading', {name: 'Quotes'})).toBeInTheDocument();
  });
});
