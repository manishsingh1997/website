import React from 'react';

import { ReactSVG } from 'react-svg';
import { Rating } from '@ergeon/core-components';

import arrowFlat from '../../../assets/arrow-flat.svg';

import './BannerRating.scss';

const RATINGS_DATA = {
  rating: 4.7,
  reviews: '2,404',
  fencesInstalled: '10,100',
}

const BannerRating = () => {
  return (
    <div className="BannerRating">
      <div className="BannerRating-stars">
        <Rating value={RATINGS_DATA.rating} />
        <p>{RATINGS_DATA.rating}/5</p>
      </div>
      <div className="BannerRating-ratingText">
        <div>
          <p>Based on {RATINGS_DATA.reviews} reviews</p>
          <p>& {RATINGS_DATA.fencesInstalled} fences installed!</p>
        </div>
        <ReactSVG className="is-ArrowImg" src={arrowFlat} />
      </div>
    </div>
  )
}

export default BannerRating;
