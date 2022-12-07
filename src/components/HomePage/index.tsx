import React from 'react';

import Customer from '../../assets/customer-linden.jpg';
import TellUsForm from '../../containers/TellUsForm';

import FenceCalculatorPromo from './components/FenceCalculatorPromo';
import ProjectsSection from './components/ProjectsSection';
import GetStartedSection from './components/GetStartedSection';
import TestimonialBanner from './components/TestimonialBanner';
import UpcomingRemoteFeatures from './components/UpcomingRemoteFeatures';
import CustomerReview from './components/CustomerReview';
import MainTopBanner from './components/MainTopBanner';
import {fenceCards} from './components/ProjectsSection/data';

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
        <CustomerReview image={Customer} title="From the start Ergeon fencing was wonderful to work with!" />
        <ProjectsSection cards={fenceCards} />
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
