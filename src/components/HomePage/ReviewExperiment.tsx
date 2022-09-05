import React from 'react';

import {Rating, OptimizedImage} from '@ergeon/core-components';
import classNames from 'classnames';

type ReviewExperimentTypes = {
  logo: string;
  rating: number;
  reviewCount: string;
  reviewerName: string;
  text: string;
  title: string;
  url: string;
  classLogo: string;
};

const ReviewExperiment = (props: ReviewExperimentTypes) => {
  const {url, rating, reviewCount, logo, title, text, reviewerName, classLogo} = props;
  return (
    <div className="review-hero__flex-wrapper">
      <div className="review-hero__customer-reviews">
        <h4>Customer reviews</h4>
        <a href={url}>
          <div className="review-hero__customer-reviews__home-advisor-section">
            <div className="review-hero__customer-reviews__rating">
              <Rating value={rating > 4.5 ? 4.5 : rating} />
              <div className="review-hero__customer-reviews__rating__numbers">
                {rating} / {reviewCount} Verified Reviews
              </div>
            </div>
            <OptimizedImage alt="Customer reviews" className={classNames(classLogo)} src={logo} />
          </div>
        </a>
      </div>
      <div className="review-hero__main-review">
        <h4>{title}</h4>
        <p>
          <i>{text}</i>
        </p>
        <div className="review-hero__main-review__bottom">
          <span className="label">{reviewerName}</span>
          <span>
            More reviews on <a href={`${process.env.PROJECTS_GALLERY_HOST}/tags/feedback`}>Project Showcase</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewExperiment;
