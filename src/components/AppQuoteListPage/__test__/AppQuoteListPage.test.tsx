import React from 'react';
import '@testing-library/jest-dom';

import {BrowserRouter} from 'react-router-dom';
import {render, screen, waitFor} from '@testing-library/react';
import {localStorage as ls} from '@ergeon/erg-utils-js';

import AppQuoteListPage from '../AppQuoteListPage';
import {CustomerQuoteViewPreference, LS_ERGEON_CUSTOMER_MENU_QUOTE_VIEW_PREFERENCE} from '../constants';
import mockList from '../__mock__/quoteList';
import {Quotes} from '../types';

const props = {
  isLoading: false,
  listError: null,
  quotes: mockList as unknown as Quotes[],
  getQuotes: jest.fn,
};

describe('render AppQuoteListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should header content to be in the document', () => {
    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', {name: 'Quotes'})).toBeInTheDocument();
  });

  it('should the header grid icon be active by default', () => {
    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} />
      </BrowserRouter>
    );

    const button = screen.getByLabelText('grid button');

    expect(button).toHaveClass('active');
  });

  it('should the lister icon be active if this is setted on local storage', () => {
    jest.spyOn(ls, 'get').mockImplementation(() => CustomerQuoteViewPreference.Lister);
    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} />
      </BrowserRouter>
    );

    const button = screen.getByLabelText('lister button');
    expect(button).toHaveClass('active');
  });

  it('should call handleIconClick with the correct values', async () => {
    const spy = jest.spyOn(ls, 'set');
    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} />
      </BrowserRouter>
    );
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

  it('should not render the card when quote is empty', () => {
    jest.spyOn(ls, 'get').mockImplementation(() => CustomerQuoteViewPreference.Grid);

    const {container} = render(
      <BrowserRouter>
        <AppQuoteListPage {...props} quotes={[]} />
      </BrowserRouter>
    );
    const wrapper = container.querySelector('.quote-page-content');
    expect(wrapper?.firstChild).toBeUndefined();
  });

  it('should render the correctly card length', () => {
    const {container} = render(
      <BrowserRouter>
        <AppQuoteListPage {...props} />
      </BrowserRouter>
    );
    const cardList = container.querySelectorAll('.card-wrapper');
    expect(cardList).toHaveLength(4);
  });

  it('should render a card with status approved', () => {
    const cardApprovedMock = props.quotes[0];

    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} quotes={[cardApprovedMock]} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Approved/g)).toBeInTheDocument();
    expect(screen.queryByText(/Cancelled/g)).not.toBeInTheDocument();
  });

  it('should render a card with status cancelled', () => {
    const cardCancelledMock = props.quotes[1];

    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} quotes={[cardCancelledMock]} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Cancelled/g)).toBeInTheDocument();
    expect(screen.queryByText(/Approved/g)).not.toBeInTheDocument();
  });

  it('should render the success icon', () => {
    const cardApprovedMock = props.quotes[0];
    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} quotes={[cardApprovedMock]} />
      </BrowserRouter>
    );
    const icon = screen.getByTestId(`icon-${cardApprovedMock.status}`);

    expect(icon).toBeInTheDocument();
  });

  it('should render the error icon', () => {
    const cardCancelledMock = props.quotes[1];
    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} quotes={[cardCancelledMock]} />
      </BrowserRouter>
    );
    const icon = screen.getByTestId(`icon-${cardCancelledMock.status}`);

    expect(icon).toBeInTheDocument();
  });

  it('should render two cards with different statuses', () => {
    const cardApprovedMock = props.quotes[0];
    const cardCancelledMock = props.quotes[1];

    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} quotes={[cardApprovedMock, cardCancelledMock]} />
      </BrowserRouter>
    );

    const iconSuccess = screen.getByTestId(`icon-${cardApprovedMock.status}`);
    const iconError = screen.getByTestId(`icon-${cardCancelledMock.status}`);

    expect(iconSuccess).toBeInTheDocument();
    expect(iconError).toBeInTheDocument();
  });

  it('should render a card grid when local storage is grid', () => {
    jest.spyOn(ls, 'get').mockImplementation(() => CustomerQuoteViewPreference.Grid);

    const {container} = render(
      <BrowserRouter>
        <AppQuoteListPage {...props} />
      </BrowserRouter>
    );

    expect(container.querySelector('.card-grid-view')).toBeInTheDocument();
  });

  it('should render a card lister when local storage is lister', () => {
    jest.spyOn(ls, 'get').mockImplementation(() => CustomerQuoteViewPreference.Lister);

    const {container} = render(
      <BrowserRouter>
        <AppQuoteListPage {...props} />
      </BrowserRouter>
    );

    expect(container.querySelector('.card-lister-view')).toBeInTheDocument();
  });

  it('should render a empty message when quote is empty', () => {
    render(
      <BrowserRouter>
        <AppQuoteListPage {...props} quotes={[]} />
      </BrowserRouter>
    );

    expect(screen.getByText('There are no quotes.')).toBeInTheDocument();
  });
});
