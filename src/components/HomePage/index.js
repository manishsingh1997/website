import React from 'react';
import PropTypes from 'prop-types';

import {BadgesSection} from '@ergeon/core-components';

import SliderHero from './SliderHero';

import ReviewHero from './ReviewHero';
import ProjectsSection from './ProjectsSection';
import PromoBlock from './PromoBlock';
import GetStartedSection from './GetStartedSection';
import QASection from './QASection';
import imgCalc from 'assets/calc_promo.png';
import imgMap from 'assets/map_image.png';

class HomePage extends React.Component {

  static propTypes = {
    isChristmasTime: PropTypes.bool.isRequired,
    isUpcomingFeaturesEnabled: PropTypes.bool.isRequired,
  };

  render() {
    const {isChristmasTime, isUpcomingFeaturesEnabled} = this.props;

    return (
      <div>
        <SliderHero isChristmasTime={isChristmasTime} isUpcomingFeaturesEnabled={isUpcomingFeaturesEnabled}/>
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
          <QASection/>
          <PromoBlock
            btnLink="https://app.ergeon.com/projects-gallery/#/map"
            btnName="Open Map"
            img={imgMap}
            subtitle="Find fence projects near your house"
            title="Browse Projects In Your Area"/>
          <BadgesSection/>
        </div>
      </div>
    );
  }
}

export default HomePage;
