import React, {useMemo} from 'react';

import classNames from 'classnames';
import {ReactSVG} from 'react-svg';
import moment from 'moment';
import IconError from '@ergeon/core-components/src/assets/icon-error.svg';
import IconSuccess from '@ergeon/core-components/src/assets/icon-success.svg';

import {formatPrice} from '../../utils/app-order';

import {QuoteCardProps} from './types';
import './QuoteCard.scss';

const QuoteCard = (props: QuoteCardProps) => {
  const {previewUrl, title, cardType = 'grid', status, totalPrice, sentOn} = props;

  const wrapperClassName = useMemo(() => {
    return classNames('card-wrapper', {
      'card-grid-view': cardType === 'grid',
      'card-lister-view': cardType === 'lister',
    });
  }, [cardType]);

  const statusIcon = useMemo(() => {
    if (status === 'Approved') {
      return IconSuccess;
    }

    return IconError;
  }, [status]);

  return (
    <div className={wrapperClassName}>
      <img alt={title} className="card-img" height={170} loading="lazy" src={previewUrl} width={200} />
      <h1 className="card-title h6">{title}</h1>
      {cardType === 'grid' && (
        <div className="card-info">
          <div className="card-status">
            <ReactSVG data-testid={`icon-${status}`} src={statusIcon} />
            <span className="card-status-text">{`${status} - ${formatPrice(totalPrice)}`}</span>
          </div>
        </div>
      )}

      <div className="card-date">{moment(sentOn).format('ll')}</div>
    </div>
  );
};

export default QuoteCard;
