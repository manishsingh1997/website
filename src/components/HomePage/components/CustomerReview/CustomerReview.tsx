import React from 'react';

import { OptimizedImage } from '@ergeon/core-components';

import Quote from '../../../../assets/quote.svg';

import './CustomerReview.scss';

type CustomerReviewProps = {
  image: string,
  title: string,
};

const CustomerReview = (props: CustomerReviewProps) => {
  const {image, title} = props;

  return (
    <div className="CustomerReview">
      <div className="CustomerReview-image ratio-image">
        <OptimizedImage alt="customer review image" src={image} />
      </div>
      <div className="CustomerReview-review">
        <div className="CustomerReview-reviewTitle">
          <span className="h4">{title}</span>
          <span className="quote-icon ratio-image">
            <OptimizedImage alt="quote" src={Quote} />
          </span>
        </div>
        <p className="CustomerReview-reviewDescription">
          Fast communication, and I was able to text or call. They were able to get me on the schedule within a week and
          the work they did was professional and well done. 10/10 would recommend!
        </p>
        <p className="CustomerReview-reviewAuthor">- Linden B.</p>
      </div>
    </div>
  );
};

export default CustomerReview;
