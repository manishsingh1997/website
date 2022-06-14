import React from 'react';

import { BadgesSection } from '@ergeon/core-components';

import { showUpcomingFeatures } from '../../utils/utils';

import TellUsForm from '../../containers/TellUsForm';
import FeaturesBlock from './components/FeaturesBlock';
import FenceCalculatorPromo from './components/FenceCalculatorPromo';
import SliderHero from './SliderHero';
import ReviewHero from './ReviewHero';
import ProjectsSection from './components/ProjectsSection';
import GetStartedSection from './components/GetStartedSection';
import RemoteFeatures from './components/RemoteFeatures';
import TestimonialBanner from './components/TestimonialBanner';
import UpcomingRemoteFeatures from './components/UpcomingRemoteFeatures';
import CustomerReview from './components/CustomerReview';
import BrowseProjectsPromo from './components/BrowseProjectsPromo';
import MainTopBanner from './components/MainTopBanner';

const HomePage = () => {
  return (
    <>
      {showUpcomingFeatures('ENG-13570') && <MainTopBanner />}
      {!showUpcomingFeatures('ENG-13570') && <SliderHero />}
      <div className="wrapper-1180">
        {showUpcomingFeatures('ENG-13570') && <TestimonialBanner />}
        {showUpcomingFeatures('ENG-13166') && <CustomerReview />}
        {!showUpcomingFeatures('ENG-13167') && <RemoteFeatures />}
        <ReviewHero />
        <ProjectsSection />
        {showUpcomingFeatures('ENG-13167') && <UpcomingRemoteFeatures />}
        <GetStartedSection />
        {!showUpcomingFeatures('ENG-13570') && <FeaturesBlock />}
        <FenceCalculatorPromo />
        <BrowseProjectsPromo />
        <BadgesSection />
      </div>
      {showUpcomingFeatures('ENG-13570') && <TellUsForm />}
    </>
  );
}

export default HomePage;
