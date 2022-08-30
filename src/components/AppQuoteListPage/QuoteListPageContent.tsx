import React from 'react';

import './QuoteListPageContent.scss';
import QuoteCard from './QuoteCard';
import {QuoteListPageContentProps} from './types';

const QuoteListPageContent = (props: QuoteListPageContentProps) => {
  const {quotes} = props;
  return (
    <div className="quote-list-page-content content-grid-view">
      {quotes.map((item, index) => {
        return <QuoteCard key={item.quoteId + index} {...item} />;
      })}
    </div>
  );
};

export default QuoteListPageContent;
