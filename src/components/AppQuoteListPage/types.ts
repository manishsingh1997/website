import {CustomerQuoteViewPreference} from './constants';

export type Quotes = {
  quoteId: number;
  totalPrice: string;
  title: string;
  status: string;
  sentOn: string;
  previewUrl: string;
};

export type AppQuoteListPageProps = {
  isListLoading?: boolean;
  listError?: Error[] | null;
  quotes: Quotes[];
  getQuotes: (customerGID: number) => void;
};

export type QuoteListPageContentProps = {
  quotes: Quotes[];
  customerViewPreference: CustomerQuoteViewPreference;
};

export type QuoteCardProps = {
  cardType: CustomerQuoteViewPreference;
} & Quotes;

export type QuoteListPageHeaderProps = {
  handleLocalStorageChange?: (value: CustomerQuoteViewPreference) => void;
};
