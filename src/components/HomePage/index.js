import React from 'react';

import {BadgesSection} from '@ergeon/core-components';

import config from 'website/config';
import SliderHero from './SliderHero';
import ReviewHero from './ReviewHero';
import ProjectsSection from './ProjectsSection';
import PromoBlock from './PromoBlock';
import GetStartedSection from './GetStartedSection';
import QASection from './QASection';
import imgCalc from 'assets/calc_promo.png';
import imgMap from 'assets/map_image.png';
import RemoteFeatures from './RemoteFeatures';

class HomePage extends React.Component {

  render() {
    return (
      <>
        <SliderHero/>
        <RemoteFeatures/>
        <ReviewHero/>
        <div className="wrapper-1180">
          <ProjectsSection/>
          <PromoBlock
            btnLink={config.fencequotingHost}
            btnName="Fence Calculator"
            img={imgCalc}
            subtitle="Build your dream fence and get an estimate instantly"
            title="Try Our Fence Calculator"/>
          <GetStartedSection/>
          <QASection/>
          <PromoBlock
            btnLink={`${config.projectsGalleryHost}/map`}
            btnName="Open Map"
            img={imgMap}
            subtitle="Find fence projects near your house"
            title="Browse Projects In Your Area"/>
          <BadgesSection/>
        </div>
      </>
    );
  }
}

export default HomePage;
