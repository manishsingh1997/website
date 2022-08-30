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
};

export type QuoteCardProps = {
  cardType?: 'grid' | 'lister';
} & Quotes;
