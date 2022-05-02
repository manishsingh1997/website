import React from 'react';

import CareersHero from '../../assets/careers-page/career_hero.jpg';
import Collage from '../../assets/careers-page/career_collage.jpg';
import shirt from '../../assets/careers-page/career_shirt.png';
import glass from '../../assets/careers-page/career_glass.png';
import bags from '../../assets/careers-page/career_bag.png';
import StaffMap from './StaffMap';
import StaffReviews from './StaffReviews';
import JobBoard from './JobBoard/index';

import Benefits from './Benefits';
import TeamStats from './TeamStats';
import Impact from './Impact';

import './index.scss';

const CareersPage = () => {
  return (
    <div className="Careers">
      <div className="Careers-spacing is-bottom-64 is-bottomMobile-30 img-container collage-1">
        <img alt="collage" src={CareersHero} />
      </div>
      <div className="Careers-content page-container Careers-spacing is-bottom-64">
        <div className="header Careers-spacing is-bottom-64 is-bottomMobile-20">
          <h1>Everyone Should Have Access To The Job They Love</h1>
          <br />
          <h3>
            Join us as we make the  <br className="show-mobile" />construction industry
            <br className="hide-mobile" /> friendly <br className="show-mobile" /> and accessible
          </h3>
        </div>
        <Impact />
        <div className="Careers-spacing is-bottom-64">
          <p className="sub-content width-restricted to-620">
            We believe everyone has a right to professional growth and respect, no matter their location. Ergeon’s
            workforce is given meaningful opportunities and is supported by a kind and diverse community.
            <br />
            <br />
            Our global staff (aka&nbsp;Ergeoneers) have access to career growth, amazing work culture, and great
            benefits.
            <br className="hide-mobile" />
            Come join us to transform the construction industry!
          </p>
        </div>
        <StaffReviews />
      </div>

      <div className="img-container Careers-spacing is-bottom-148 is-bottomMobile-30">
        <img alt="company photo" src={Collage}/>
      </div>
      <div className="Careers-content page-container collage Careers-spacing is-bottom-96 is-bottomMobile-48">
        <JobBoard />
      </div>
      <div className="spacing collage Careers-spacing is-bottomMobile-48 is-bottom-96">
        <div className="spacing after__is-48 Careers-spacing is-bottomMobile-20">
          <h2 className="spacing after__is-12 light-bold font-weight-600">Company Benefits</h2>
          <p className="sub-content width-restricted to-620">
            Flexible work hours, team events and remote happy hours
            <br className="hide-mobile" /> are just a few of the perks we offer.
          </p>
        </div>
        <Benefits />
      </div>

      <div className="Careers-showcase collage Careers-spacing is-bottom-96 is-bottomMobile-48">
        <div className="img-container collage-3">
          <img alt="ergeon kits" src={shirt} />
        </div>
        <div className="img-container collage-3">
          <img alt="ergeon kits" src={glass} />
        </div>
        <div className="img-container collage-3">
          <img alt="ergeon kits" src={bags} />
        </div>
      </div>

      <div className="Careers-spacing is-bottomMobile-20 is-bottom-64 collage">
          <h2 className="center spacing after__is-12 light-bold font-weight-600">Our Team</h2>
          <p className="sub-content spacing after__is-12">Our amazing team is global and diverse.</p>
          <TeamStats />
      </div>
      <StaffMap />
    </div>
  );
};

export default CareersPage;
