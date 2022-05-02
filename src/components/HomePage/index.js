import React from 'react';

import {BadgesSection} from '@ergeon/core-components';

import imgCalc from 'assets/calc_promo.png';
import imgMap from 'assets/map_image.png';
import {showUpcomingFeatures} from '../../utils/utils';

import SliderHero from './SliderHero';
import ReviewHero from './ReviewHero';
import ProjectsSection from './ProjectsSection';
import PromoBlock from './PromoBlock';
import GetStartedSection from './GetStartedSection';
import UpcomingGetStartedSection from './UpcomingGetStartedSection';
import QASection from './QASection';
import RemoteFeatures from './RemoteFeatures';
import TestimonialBanner from './TestimonialBanner';

class HomePage extends React.Component {
  render() {
    return (
      <>
        <SliderHero />
        {showUpcomingFeatures('ENG-13570') && <TestimonialBanner />}
        <RemoteFeatures />
        <ReviewHero />
        <div className="wrapper-1180">
          <ProjectsSection />
          <PromoBlock
            btnLink={process.env.FENCEQUOTING_HOST}
            btnName="Fence Calculator"
            img={imgCalc}
            subtitle="Build your dream fence and get an estimate instantly"
            title="Try Our Fence Calculator"
          />
          {showUpcomingFeatures('ENG-13570') ? <UpcomingGetStartedSection /> : <GetStartedSection />}
          <QASection />
          <PromoBlock
            btnLink={`${process.env.PROJECTS_GALLERY_HOST}/map`}
            btnName="Open Map"
            img={imgMap}
            subtitle="Find fence projects near your house"
            title="Browse Projects In Your Area"
          />
          <BadgesSection />
        </div>
      </>
    );
  }
}

export default HomePage;
