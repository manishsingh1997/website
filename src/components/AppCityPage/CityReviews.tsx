import React from 'react';

import { City } from './types';
import { getAsset } from './utils';

import './MainBanner.scss';

type MainBannerProps = {
  yelp: City['review']['Yelp'],
  google: City['review']['Google'],
}

const CityReviews = (props: MainBannerProps) => {
  const { yelp, google } = props;
  return (
    <section className="wrapper-1180 CityReviews">
      <div className="flex-wrapper CityReviews-container">
        {[
          { ...yelp, type: 'Yelp' },
          { ...google, type: 'Google' },
        ].map(review => (
          <div className="CityReviews-review" key={review.type}>
            <div className="CityReviews-imgContainer">
              {review.img &&
                <img src={getAsset(review.img, 'jpeg')} />
              }
            </div>
            <div>
              <p className="h5">{review.title}</p>
              <p className="CityReviews-description">{review.description}</p>
              <p className="small-text">{review.name}</p>
              <address className="small-text">{review.address}</address>
              <p className="small-text">
                <a href={review.url} rel="nofollow">Read this review</a>
                <span> on {review.type}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
};

export default CityReviews;
