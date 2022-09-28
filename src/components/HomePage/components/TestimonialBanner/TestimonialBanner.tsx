import React from 'react';

import {RatingsData, OptimizedImage} from '@ergeon/core-components';

import yelpLogo from '../../../../assets/testimonial-icons/yelp.svg';
import googleLogo from '../../../../assets/testimonial-icons/google.svg';
import angiLogo from '../../../../assets/testimonial-icons/angi.svg';
import thumbtackLogo from '../../../../assets/testimonial-icons/thumbtack.svg';
import bbbLogo from '../../../../assets/testimonial-icons/bbb.svg';

import './TestimonialBanner.scss';

type BadgeProps = {
  rating: number | string;
  icon: string;
  reviews?: number;
};

const TestimonialBanner = () => {
  const {yelp, google, homeadvisor, thumbtack} = RatingsData;

  const renderBadge = (props: BadgeProps) => {
    const {rating, icon, reviews} = props;

    return (
      <div className="TestimonialBanner-badge">
        <OptimizedImage alt="testimonial organization" src={icon} />
        <span className="badge--txt is-bold">{rating} rating</span>
        {reviews ? (
          <span className="badge--txt is-grey">{reviews} REVIEWS</span>
        ) : (
          <span className="badge--txt is-grey">ACCREDITED</span>
        )}
      </div>
    );
  };

  return (
    <div className="TestimonialBanner">
      {renderBadge({rating: thumbtack.rating, icon: thumbtackLogo, reviews: 38})}
      {renderBadge({rating: yelp.rating, icon: yelpLogo, reviews: 2127})}
      {renderBadge({rating: google.rating, icon: googleLogo, reviews: 441})}
      {renderBadge({rating: homeadvisor.rating, icon: angiLogo, reviews: 156})}
      {renderBadge({rating: 'A', icon: bbbLogo, reviews: 0})}
    </div>
  );
};

export default TestimonialBanner;
