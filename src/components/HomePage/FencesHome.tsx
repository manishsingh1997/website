import React from 'react';

import Customer from '../../assets/customer-linden.jpg';
import TellUsForm from '../../containers/TellUsForm';

import FenceCalculatorPromo from './components/FenceCalculatorPromo';
import ProjectsSection from './components/ProjectsSection';
import GetStartedSection from './components/GetStartedSection';
import TestimonialBanner from './components/TestimonialBanner';
import UpcomingRemoteFeatures from './components/UpcomingRemoteFeatures';
import CustomerReview from './components/CustomerReview';
import {fenceCards} from './components/ProjectsSection/data';
import SliderHero, {Slide} from './SliderHero';

const FencesHomePage = () => {
  return (
    <>
      <SliderHero>
        <Slide
          name="fence"
          subtitle="Servicing cities in California, Texas, Georgia, Virginia, Maryland, Pennsylvania, and Florida"
          title="Fence Installation Service" />
      </SliderHero>
      <div className="wrapper-1180">
        <TestimonialBanner />
      </div>
      <div className="mobile-length">
        <TellUsForm />
      </div>
      <div className="wrapper-1180">
        <CustomerReview image={Customer} title="From the start Ergeon fencing was wonderful to work with!" />
        <ProjectsSection cards={fenceCards} />
        <UpcomingRemoteFeatures />
        <GetStartedSection />
        <FenceCalculatorPromo />
      </div>
      <div className="desktop-length">
        <TellUsForm />
      </div>
    </>
  );
}

export default FencesHomePage;
