import React from 'react';
import SliderHero from '../components/slider-hero';
import ReviewHero from '../components/review-hero';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <SliderHero/>
        <ReviewHero/>
      </div>
    );
  }
}

export default HomePage;