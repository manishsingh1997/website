import {HouseType, Quote} from '../types';

import {CustomerQuoteViewPreference} from './constants';

export type CustomerQuoteProps = {
  quoteId: number;
  houseId: number;
  quoteSecret: string;
  totalPrice: string;
  title: string;
  status: string;
  sentOn: string;
  previewUrl: string;
};

export type AppQuoteListPageProps = {
  isListLoading?: boolean;
  listError?: Error[] | null;
  quotes: CustomerQuoteResponseProps[];
  getQuotes: (quoteSecret: string) => void;
  selectedHouse?: HouseType;
};

export type QuoteListPageContentProps = {
  quotes: CustomerQuoteProps[];
  customerViewPreference: CustomerQuoteViewPreference;
};

export type QuoteCardProps = {
  cardType: CustomerQuoteViewPreference;
} & CustomerQuoteProps;

export type QuoteListPageHeaderProps = {
  handleLocalStorageChange?: (value: CustomerQuoteViewPreference) => void;
};

export type CustomerQuoteResponseProps = {
  id: string;
  secret: string;
  quote: Quote;
};
