import React from 'react';

import {BadgesSection} from '@ergeon/core-components';

import {showUpcomingFeatures} from '../../utils/utils';

import TellUsForm from '../../containers/TellUsForm';
import FenceCalculatorPromo from './components/FenceCalculatorPromo';
import SliderHero from './SliderHero';
import ReviewHero from './ReviewHero';
import ProjectsSection from './components/ProjectsSection';
import GetStartedSection from './components/GetStartedSection';
import QASection from './QASection';
import RemoteFeatures from './components/RemoteFeatures';
import TestimonialBanner from './components/TestimonialBanner';
import UpcomingRemoteFeatures from './components/UpcomingRemoteFeatures';
import CustomerReview from './components/CustomerReview';
import BrowseProjectsPromo from './components/BrowseProjectsPromo';

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
        {showUpcomingFeatures('ENG-13167') && <UpcomingRemoteFeatures />}
        <GetStartedSection />
        <FenceCalculatorPromo />
        <QASection />
        <BrowseProjectsPromo />
        <BadgesSection />
      </div>
      {showUpcomingFeatures('ENG-13570') && <TellUsForm />}
    </>
  );
}

export default HomePage;
