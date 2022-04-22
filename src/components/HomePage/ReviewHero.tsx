import React, {useCallback} from 'react';
import {Experiment, Variant} from '@marvelapp/react-ab-test';
import {RatingsData} from '@ergeon/core-components';
import omit from 'lodash/omit';

import homeAdvisorLogo from '../../assets/home_advisor@2x.png';
import googleLogo from '../../assets/google@2x.png';
import yelpLogo from '../../assets/yelp@2x.png';

import reviews from './reviews.json';
import ReviewExperiment from './ReviewExperiment';

import './ReviewHero.scss';

/*
 * ReviewHero should display experiments based on customer reviews
 * Now that we have A/B testing in order to check variants locally we need to add
 * experimentDebugger.enable(); (include import {experimentDebugger} on react-ab-test)
 */
const ReviewHero = () => {
  const {homeadvisor, google, yelp} = RatingsData;
  const reviewsArray = [
    {
      ...reviews.homeadvisor,
      ...homeadvisor,
      logo: homeAdvisorLogo,
    },
    {
      ...reviews.google,
      ...google,
      logo: googleLogo,
    },
    {
      ...reviews.yelp,
      ...yelp,
      logo: yelpLogo,
    },
  ];

  const renderReviewExperiment = useCallback((review) => {
    // @ts-ignore
      return <ReviewExperiment {...omit(review, ['variant'])} />},
    []);

  return (
    <div className="review-hero">
      <div className="wrapper-1180">
        <Experiment name="customerReviewsExperiment">
          {reviewsArray.map((review, i) => (
            <Variant key={`variant${i}`} name={review.variant}>
              {renderReviewExperiment(review)}
            </Variant>
          ))}
        </Experiment>
      </div>
    </div>
  );
};

export default ReviewHero;
