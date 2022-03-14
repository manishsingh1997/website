import React from 'react';

import StaffMap from './StaffMap';
import StaffReviews from './StaffReviews';
import JobBoard from './JobBoard/index';

import Benefits from './Benefits';
import TeamStats from './TeamStats';
import Impact from './Impact';

import CareersHero from '../../assets/careers-page/career_hero.jpg';
import Collage from '../../assets/careers-page/career_collage.jpg';
import shirt from '../../assets/careers-page/career_shirt.png';
import glass from '../../assets/careers-page/career_glass.png';
import bags from '../../assets/careers-page/career_bag.png';

import './index.scss';

const CareersPage = () => {
  return (
    <div className="Careers spacing before__is-30 after__is-108">
      <div className="img-container collage-1">
        <img alt="collage" src={CareersHero} />
      </div>
      <div className="Careers-content page-container spacing before__is-64  after__is-48">
        <div className="header  spacing after__is-48">
          <h1>Everyone Should Have Access To The Job They Love</h1>
          <br />
          <h3>
            Join us as we make the construction industry
            <br className="hideBreaks" /> friendly and accessible
          </h3>
        </div>
        <Impact />
        <div className="spacing before__is-48 after__is-48">
          <p className="subContent width-restricted to-620">
            We believe everyone has a right to professional growth and respect,
            no matter their location. Ergeon’s workforce is given meaningful
            opportunities and is supported by a kind and diverse community.
            <br />
            <br />
            Our global staff (aka&nbsp;Ergeoneers) have access to career growth,
            amazing work culture, and great benefits.
            <br className="hideBreaks" />
            Come join us to transform the construction industry!
          </p>
        </div>
        <StaffReviews />
      </div>

      <div className="img-container spacing before__is-48">
        <img alt="company photo" src={Collage}/>
      </div>
      <div className="Careers-content page-container before__is-148 collage">
        <JobBoard />
      </div>
      <div className="spacing before__is-96 collage">
        <div className="spacing after__is-48">
          <h2 className="spacing after__is-12 light-bold">Company Benefits</h2>
          <p className="subContent width-restricted to-620">
            Flexible work hours, team events and remote happy hours
            <br className="hideBreaks" /> are just a few of the perks we offer.
          </p>
        </div>
        <Benefits />
      </div>

      <div className="Careers-showcase spacing before__is-96 collage">
        <div className="img-container collage3">
          <img alt="ergeon kits" src={shirt} />
        </div>
        <div className="img-container collage3">
          <img alt="ergeon kits" src={glass} />
        </div>
        <div className="img-container collage3">
          <img alt="ergeon kits" src={bags} />
        </div>
      </div>

      <div>
        <div className="spacing before__is-96 after__is-48 collage">
          <h2 className="center spacing after__is-12 light-bold">Our Team</h2>
          <p className="subContent">Our amazing team is global and diverse.</p>
        </div>
      </div>
      <TeamStats />
      <StaffMap />
    </div>
  );
};

export default CareersPage;
