import React from 'react';

import imageChartNinetyEight from 'assets/chart-98.svg';
import imageChartOneHundred from 'assets/chart-100.svg';
import imageLinkedin from 'assets/linkedin@2x.png';
import imageCEO from 'assets/jenny@2x.jpg';
import {Rating} from '@ergeon/core-components';

import './StaffReviews.scss';

const LINKEDIN_FOLLOWERS = '10,459';

class StaffReviews extends React.Component {
  render() {
    return (
      <div className="staff-reviews">
        <div className="staff-reviews__row">
          <div className="mobile-wrap">
            <div className="staff-reviews__row__block">
              <div className="inner-block">
                <div className="inner-block__wrap">
                  <img alt="Ninety eight percent of recommendations to a friend" src={imageChartNinetyEight}/>
                  <div className="inner-block__wrap__right-block recommend">
                    <p className="subheader h3 bold">
                      Recommend to a Friend
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="staff-reviews__row__block">
              <div className="inner-block">
                <div className="inner-block__wrap">
                  <img alt="One hundred percent approve of CEO" src={imageChartOneHundred}/>
                  <div className="inner-block__wrap__right-block approve">
                    <p className="subheader h3 bold">
                      Approve of CEO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="staff-reviews__row__block">
            <div className="inner-block">
              <div className="inner-block__wrap ceo-image-wrapper">
                <img src={imageCEO}/>
                <div className="inner-block__wrap__right-block">
                  <p className="subheader h3 bold">
                    Jiayue He
                  </p>
                  <p className="small-text spacing before__is-6">
                    71 Ratings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="staff-reviews__row">
          <div className="staff-reviews__row__block more-space">
            <div className="inner-block">
              <div className="inner-block__wrap linkedin-subsc">
                <img alt="Linkedin logo" src={imageLinkedin}/>
                <div className="inner-block__wrap__right-block linkedin">
                  <p className="subheader h3 bold">
                    Ergeon on Linkedin
                  </p>
                  <p className="small-text spacing before__is-6">
                    Construction &middot; Palo Alto, California &middot; {LINKEDIN_FOLLOWERS} followers
                  </p>
                  <a className="small-text" href="https://www.linkedin.com/company/ergeoninc/">
                    Follow us
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="staff-reviews__row__block">
            <div className="inner-block">
              <div className="inner-block__wrap ratings">
                <div className="inner-block__wrap__top-block">
                  <p className="subheader h3 bold">4.9</p>
                  <Rating value={4.9} />
                </div>
                <div className="inner-block__wrap__bottom-block">
                  <p className="small-text">
                    More reviews on <a href="https://www.glassdoor.ca/Reviews/Ergeon-Reviews-E2131774_P2.htm">Glassdor</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StaffReviews;