import React, {useMemo} from 'react';

import classNames from 'classnames';

import {useIsMobileWidth} from '../common/AppQuoteComponents/QuoteLine/customHooks';

import './QuoteListPageContent.scss';
import QuoteCard from './QuoteCard';
import {QuoteListPageContentProps} from './types';
import {CustomerQuoteViewPreference} from './constants';

const QuoteListPageContent = (props: QuoteListPageContentProps) => {
  const {quotes, customerViewPreference} = props;

  const contentClassName = useMemo(() => {
    return classNames('quote-page-content', {
      'content-grid-view': customerViewPreference === CustomerQuoteViewPreference.Grid,
      'content-lister-view': customerViewPreference === CustomerQuoteViewPreference.Lister,
    });
  }, [customerViewPreference]);

  const isMobileWidth = useIsMobileWidth();

  const topContent = useMemo(() => {
    if (!isMobileWidth && customerViewPreference === CustomerQuoteViewPreference.Lister) {
      return (
        <div className="table-lister">
          <span className="table-id">ID</span>
          <span className="table-title">Title</span>
          <span className="table-price">Total Price</span>
          <span className="table-info">Status</span>
          <span className="table-date">Sent on</span>
        </div>
      );
    }

    return null;
  }, [isMobileWidth, customerViewPreference]);

  return (
    <div className={contentClassName}>
      {topContent}
      {quotes.map((item, index) => {
        return <QuoteCard key={item.quoteId + index} {...item} cardType={customerViewPreference} />;
      })}
    </div>
  );
};

export default QuoteListPageContent;
