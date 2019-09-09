import './review-hero.scss';
import React from 'react';
import homeAdvisorLogo from '../assets/home_advisor@2x.png';

class ReviewHero extends React.Component {
  render() {
    return (
      <div className="review-hero">
        <div className="wrapper-1180">
          <div className="review-hero__flex-wrapper">
            <div className="review-hero__customer-reviews">
              <h4>Customer reviews</h4>
              <div className="review-hero__customer-reviews__home-advisor-section">
                <div className="review-hero__customer-reviews__rating">
                  <div className="stars-group">
                    <div className="icon star"/>
                    <div className="icon star"/>
                    <div className="icon star"/>
                    <div className="icon star"/>
                    <div className="icon star half"/>
                  </div>
                  <div className="review-hero__customer-reviews__rating__numbers">4.79 / 35 Verified Ratings</div>
                </div>
                <img className="review-hero__customer-reviews__home-advisor-logo" src={homeAdvisorLogo}/>
              </div>

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
                More reviews on <a href="">Project Showcase</a>
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
