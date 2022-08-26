import React from 'react';
import '@testing-library/jest-dom';

import {render, screen, waitFor} from '@testing-library/react';
import {localStorage as ls} from '@ergeon/erg-utils-js';

import AppQuoteListPage from '../AppQuoteListPage';
import {CustomerQuoteViewPreference, LS_ERGEON_CUSTOMER_MENU_QUOTE_VIEW_PREFERENCE} from '../contraints';

describe('render AppQuoteListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should header content to be in the document', () => {
    render(<AppQuoteListPage />);

    expect(screen.getByRole('heading', {name: 'Quotes'})).toBeInTheDocument();
  });

  it('should the header grid icon be active by default', () => {
    render(<AppQuoteListPage />);

    const button = screen.getByLabelText('grid button');

    expect(button).toHaveClass('active');
  });

  it('should the lister icon be active if this is setted on local storage', () => {
    jest.spyOn(ls, 'get').mockImplementation(() => CustomerQuoteViewPreference.Lister);
    render(<AppQuoteListPage />);

    const button = screen.getByLabelText('lister button');
    expect(button).toHaveClass('active');
  });

  it('should call handleIconClick with the correct values', async () => {
    const spy = jest.spyOn(ls, 'set');
    render(<AppQuoteListPage />);
    const gridButton = screen.getByLabelText('grid button');

    gridButton.click();

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(LS_ERGEON_CUSTOMER_MENU_QUOTE_VIEW_PREFERENCE, CustomerQuoteViewPreference.Grid);
    });

    const listerButton = screen.getByLabelText('lister button');

    listerButton.click();

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        LS_ERGEON_CUSTOMER_MENU_QUOTE_VIEW_PREFERENCE,
        CustomerQuoteViewPreference.Lister
      );
    });
  });
});
