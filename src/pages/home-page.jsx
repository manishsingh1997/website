import React from 'react';
import SliderHero from '../components/slider-hero';
import ReviewHero from '../components/review-hero';
import ProjectsSection from '../components/projects-section';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <SliderHero/>
        <ReviewHero/>
        <ProjectsSection/>
      </div>
    );
  }
}

export default HomePage;