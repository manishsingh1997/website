import React from 'react';

import {BadgesSection} from '@ergeon/core-components';

import imgCalc from 'assets/calc_promo.png';
import imgMap from 'assets/map_image.jpg';
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
import UpcomingRemoteFeatures from './UpcomingRemoveFeatures';
import CustomerReview from './CustomerReview';

const HomePage = () => {
    return (
      <>
        <SliderHero />
        <div className="wrapper-1180">
          {showUpcomingFeatures('ENG-13570') && <TestimonialBanner />}
          {showUpcomingFeatures('ENG-13166') && <CustomerReview />}
          {!showUpcomingFeatures('ENG-13167') && <RemoteFeatures />}
          <ReviewHero />
          <ProjectsSection />
          {showUpcomingFeatures('ENG-13167') && <UpcomingRemoteFeatures/>}
          {showUpcomingFeatures('ENG-13570') ? <UpcomingGetStartedSection /> : <GetStartedSection />}
          <PromoBlock
            btnLink={process.env.FENCEQUOTING_HOST}
            btnName="Fence Calculator"
            img={imgCalc}
            subtitle="Build your dream fence and get an estimate instantly"
            title="Try Our Fence Calculator"
          />
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

export default HomePage;
