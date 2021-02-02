import React from 'react';
import homeAdvisorLogo from 'assets/home_advisor@2x.png';
import {Rating, RatingsData} from '@ergeon/core-components';
import config from 'website/config';

import './ReviewHero.scss';

class ReviewHero extends React.Component {
  render() {
    const {homeadvisor} = RatingsData;
    return (
      <div className="review-hero">
        <div className="wrapper-1180">
          <div className="review-hero__flex-wrapper">
            <div className="review-hero__customer-reviews">
              <h4>Customer reviews</h4>
              <a href="https://www.homeadvisor.com/rated.ErgeonPaloAlto.66624661.html">
                <div className="review-hero__customer-reviews__home-advisor-section">
                  <div className="review-hero__customer-reviews__rating">
                    <Rating value={homeadvisor.rating > 4.5 ? 4.5 : homeadvisor.rating}/>
                    <div className="review-hero__customer-reviews__rating__numbers">
                      {homeadvisor.rating} / {homeadvisor.reviewCount} Verified Reviews</div>
                  </div>
                  <img className="review-hero__customer-reviews__home-advisor-logo" src={homeAdvisorLogo}/>
                </div>
              </a>

            </div>
            <div className="review-hero__main-review">
              <h4>The installation went great!</h4>
              <p><i>
                Roberto and team were very flexible and took care of few adjustments without
                making a big deal about it. I would recommend this service to a friend.
              </i></p>
              <div className="review-hero__main-review__bottom">
                <span className="label">Taylor K.</span>
                <span>
                  More reviews on <a href={`${config.projectsGalleryHost}/tags/feedback`}>Project Showcase</a>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}
export default ReviewHero;
