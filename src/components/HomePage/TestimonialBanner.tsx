import React from 'react';
import {ReactSVG} from 'react-svg';
import {RatingsData} from '@ergeon/core-components';

import yelpLogo from '../../assets/testimonial-icons/yelp.svg';
import googleLogo from '../../assets/testimonial-icons/google.svg';
import homeadvisorLogo from '../../assets/testimonial-icons/angi.svg';
import thumbtackLogo from '../../assets/testimonial-icons/thumbtack.svg';
import bbbLogo from '../../assets/testimonial-icons/bbb.svg';

import './TestimonialBanner.scss';

type BadgeProps = {
  rating: number | string;
  icon: string;
  className: string;
};

type BannerProps = {
  isMobile: boolean;
};

const renderBadge = (props: BadgeProps) => {
  const {rating, icon, className} = props;

  return (
    <div className={className}>
      <ReactSVG src={icon} />
      <div className="badge--txt">
        {rating} {typeof(rating) === 'string' ? 'rated' : 'rating'}
      </div>
    </div>
  );
};

const renderBanner = (props: BannerProps) => {
  const {isMobile} = props;
  const {yelp, google, homeadvisor, thumbtack} = RatingsData;

  const bannerClass = isMobile ? 'MobileContainer-TestimonialBanner' : 'TestimonialBanner';
  const badgeClass = isMobile ? 'MobileContainer-Badge' : 'Badge';

  return (
    <div className={bannerClass}>
      {renderBadge({rating: yelp.rating, icon: yelpLogo, className: badgeClass})}
      {renderBadge({rating: google.rating, icon: googleLogo, className: badgeClass})}
      {renderBadge({rating: homeadvisor.rating, icon: homeadvisorLogo, className: badgeClass})}
      {renderBadge({rating: thumbtack.rating, icon: thumbtackLogo, className: badgeClass})}
      {renderBadge({rating: 'A', icon: bbbLogo, className: badgeClass})}
    </div>
  );
};

const TestimonialBanner = () => {
  return (
    <div>
      <div className="mobile-length">
        <div className="MobileContainer">
          {renderBanner({isMobile: true})}
        </div>
      </div>
      <div className="desktop-length">
        {renderBanner({isMobile: false})}
      </div>
    </div>
  );
};

export default TestimonialBanner;
