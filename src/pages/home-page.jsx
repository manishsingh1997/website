import React from 'react';
import SliderHero from '../components/slider-hero';
import ReviewHero from '../components/review-hero';
import ProjectsSection from '../components/projects-section';
import PromoBlock from '../components/promo-block';
import GetStartedSection from '../components/get-started-section';
import imgCalc from '../assets/calc_promo.png';
import imgMap from '../assets/map_image.png';
class HomePage extends React.Component {
  render() {
    return (
      <div>
        <SliderHero/>
        <ReviewHero/>
        <div className="wrapper-1180">
          <ProjectsSection/>
          <PromoBlock
            btnLink="https://fencequoting.com/"
            btnName="Fence Calculator"
            img={imgCalc}
            subtitle="Build your dream fence and get an estimate instantly"
            title="Try Our Fence Calculator"/>
          <GetStartedSection/>
          <PromoBlock
            btnLink="https://app.ergeon.com/projects-gallery/#/map"
            btnName="Open Map"
            img={imgMap}
            subtitle="Find fence projects near your house"
            title="Browse Projects In Your Area"/>
        </div>

      </div>
    );
  }
}

export default HomePage;