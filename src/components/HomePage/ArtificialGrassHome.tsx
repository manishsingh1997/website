import React from 'react';

import Customer from '../../assets/customer-grass.jpg';
import TellUsForm from '../../containers/TellUsForm';
import { CustomLeadFormType } from '../RequestQuotePage/TellUsForm/useCustomLeadForm';

import ProjectsSection from './components/ProjectsSection';
import GetStartedSection from './components/GetStartedSection';
import TestimonialBanner from './components/TestimonialBanner';
import UpcomingRemoteFeatures from './components/UpcomingRemoteFeatures';
import CustomerReview from './components/CustomerReview';
import { artificialGrassCards } from './components/ProjectsSection/data';
import SliderHero, { Slide } from './SliderHero';

import './ArtificialGrassHome.scss';

const ArtificialGrassHomePage = () => {
  return (
    <main className="ArtificialGrassHome">
      <SliderHero>
        <Slide
          isGrass
          name="artificial-grass"
          subtitle="Servicing the Bay Area and Sacramento."
          title="Artificial Grass Landscaping" />
      </SliderHero>
      <div className="wrapper-1180">
        <TestimonialBanner />
      </div>
      <div className="mobile-length">
        <TellUsForm type={CustomLeadFormType.ArtificialGrass} />
      </div>
      <div className="wrapper-1180">
        <CustomerReview image={Customer} title="From start to finish Ergeon was wonderful to work with" />
        <ProjectsSection cards={artificialGrassCards} />
      </div>
      <div className="desktop-tablet-length">
        <TellUsForm type={CustomLeadFormType.ArtificialGrass} />
      </div>
      <div className="wrapper-1180">
        <UpcomingRemoteFeatures />
        <GetStartedSection />
      </div>
    </main>
  );
}

export default ArtificialGrassHomePage;
