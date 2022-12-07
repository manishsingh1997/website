import React, {useMemo} from 'react';

import classNames from 'classnames';
import {OptimizedImage} from '@ergeon/core-components';

import {City} from './types';
import {getAsset} from './utils';

import './MainBanner.scss';

type MainBannerProps = {
  yelp?: City['review']['Yelp'];
  google?: City['review']['Google'];
};

type Reviews = City['review']['Yelp' | 'Google'] & {
  type: string;
};

const CityReviews = (props: MainBannerProps) => {
  const {yelp, google} = props;

  const reviews = useMemo(
    () => [yelp && {...yelp, type: 'Yelp'}, google && {...google, type: 'Google'}].filter(Boolean) as Reviews[],
    [yelp, google]
  );

  if (!yelp && !google) {
    return null;
  }

  return (
    <section className="wrapper-1180 CityReviews">
      <div className="CityReviews-container">
        {reviews.map((review) => (
          <div className="CityReviews-review" key={review.type}>
            <div className={classNames('CityReviews-imgContainer', {'is-empty': !review.img})}>
              {review.img && <OptimizedImage alt={review.title} src={getAsset(review.img, 'jpeg')} />}
            </div>
            <div>
              <h3 className="h5">{review.title}</h3>
              <p className="CityReviews-description">{review.description}</p>
              <p className="small-text">{review.name}</p>
              <address className="small-text">{review.address}</address>
              <p className="small-text">
                <a aria-label={`Read the review of ${review.name} on ${review.type}`} href={review.url} rel="nofollow">
                  Read this review
                </a>
                <span> on {review.type}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CityReviews;
