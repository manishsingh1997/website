import React from 'react';

import Customer from '../../assets/customer-linden.png';
import Quote from '../../assets/quote.svg';

import './CustomerReview.scss';

const CustomerReview = () => {
  return (
    <div className="CustomerReview">
      <div className="CustomerReview-image ratio-image">
        <img alt="customer review image" src={Customer} />
      </div>
      <div className="CustomerReview-review">
        <div className="CustomerReview-reviewTitle">
          <span className="h4">From the start Ergeon fencing was wonderful to work with!</span>
          <span className="quote-icon ratio-image">
            <img alt="quote" src={Quote} />
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
