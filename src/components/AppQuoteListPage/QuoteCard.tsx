import React, {useContext, useMemo} from 'react';

import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {ReactSVG} from 'react-svg';
import moment from 'moment';
import IconError from '@ergeon/core-components/src/assets/icon-error.svg';
import IconSuccess from '@ergeon/core-components/src/assets/icon-success.svg';

import {formatPrice} from '../../utils/app-order';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';

import {QuoteCardProps} from './types';
import './QuoteCard.scss';
import {CustomerQuoteViewPreference} from './constants';

const QuoteCard = (props: QuoteCardProps) => {
  const {previewUrl, title, cardType, status, totalPrice, sentOn, quoteId, quoteSecret} = props;

  const customerGID = useContext(CustomerGIDContext);

  const wrapperClassName = useMemo(() => {
    return classNames('card-wrapper', {
      'card-grid-view': cardType === CustomerQuoteViewPreference.Grid,
      'card-lister-view': cardType === CustomerQuoteViewPreference.Lister,
    });
  }, [cardType]);

  const statusIcon = useMemo(() => {
    if (status === 'Approved') {
      return IconSuccess;
    }

    return IconError;
  }, [status]);

  const linkTo = useMemo(() => {
    return `/app/${customerGID}/${quoteSecret}/quotes/${quoteId}`;
  }, [customerGID, quoteSecret, quoteId]);

  return (
    <Link to={linkTo}>
      <div className={wrapperClassName}>
        <img alt={title} className="card-img" height={170} loading="lazy" src={previewUrl} width={200} />
        <h1 className="card-id h6"> {`#${quoteId}`}</h1>
        <h1 className="card-title h6">{title}</h1>
        <span className="card-price">{formatPrice(totalPrice)}</span>
        <div className="card-info">
          <div className="card-status">
            <ReactSVG data-testid={`icon-${status}`} src={statusIcon} />
            <div className="card-info-text">
              <span className="card-status-label">{status}</span>
              <span className="card-status-divider">{' - '}</span>
              <span className="card-status-price">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>

        <div className="card-date">{moment(sentOn).format('ll')}</div>
      </div>
    </Link>
  );
};

export default QuoteCard;
