import React from 'react';

import TellUsForm from '../../containers/TellUsForm';

import FenceCalculatorPromo from './components/FenceCalculatorPromo';
import ProjectsSection from './components/ProjectsSection';
import GetStartedSection from './components/GetStartedSection';
import TestimonialBanner from './components/TestimonialBanner';
import UpcomingRemoteFeatures from './components/UpcomingRemoteFeatures';
import CustomerReview from './components/CustomerReview';
import MainTopBanner from './components/MainTopBanner';

const HomePage = () => {
  return (
    <>
      <MainTopBanner />
      <div className="wrapper-1180">
        <TestimonialBanner />
      </div>
      <div className="mobile-length">
        <TellUsForm />
      </div>
      <div className="wrapper-1180">
        <CustomerReview />
        <ProjectsSection />
      </div>
      <div className="desktop-length">
        <TellUsForm centerText />
      </div>
      <div className="wrapper-1180">
        <UpcomingRemoteFeatures />
        <GetStartedSection />
        <FenceCalculatorPromo />
      </div>
      <div className="tablet-length">
        <TellUsForm />
      </div>
    </>
  );
};

export default HomePage;
