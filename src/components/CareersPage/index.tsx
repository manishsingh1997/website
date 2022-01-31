import React from 'react';

import StaffMap from './StaffMap';
import StaffReviews from './StaffReviews';
import JobBoard from './JobBoard';

import Benefits from './Benefits';
import TeamStats from './TeamStats';

import CareersHero from '../../assets/careers-page/career_hero.jpg';
import Collage from '../../assets/careers-page/career_collage.jpg';
import TeamBenefits from '../../assets/careers-page/career_ergeon.jpg';

import './index.scss';

const CareersPage = () => {
  return (
    <>
      <div className="careers-page__img-container">
        <img src={CareersHero} />
      </div>
      <div className="careers-page wrapper-1180">
        <div className="spacing before__is-64 after__is-64">
          <h1>Everyone should have access to the job they love</h1>
          <br />
          <h3 className="subheader">
            Join us as we make the construction industry friendly and accessible
          </h3>
        </div>
        <StaffReviews />
        <div className="spacing before__is-64">
          <p className="subheader h2 subheader-light">
            We believe that everyone has a rigth to professional growth and
            respect regardless of their location. Ergeon global staff
            (aka&nbsp;Ergeoneers) are given meaningful opportunities and support
            in a kind and diverse community. This ensures that our workforce,
            around the world, has access to career growth, amazing work culture
            and great benefits.
            <br />
            <br />
            We have a fast-growing and diverse team spread across 35+ countries
            today. <br className="careers-page__hide-breaks" />
            Come join us to transform the construction industry!.
          </p>
        </div>
      </div>
      <div className="careers-page__img-container spacing before__is-64 after__is-64">
        <img src={Collage} />
      </div>
      <div className="careers-page wrapper-1180">
        <JobBoard />
        <div className="spacing before__is-64">
          <h2 className="spacing after__is-30">Company benefits</h2>
          <p className="subheader h2 spacing after__is-48">
            In addition to flexible work hours, remote happy hours <br />
            and team events here are the few of the perks we offer.
          </p>
          <Benefits />
        </div>
      </div>
      <div className="careers-page__img-container spacing before__is-64 after__is-64">
        <img src={TeamBenefits} />
      </div>
      <div className="careers-page wrapper-1180">
        <div>
          <div className="spacing before__is-48 after__is-48">
            <h2 className="center spacing after__is-12">Our Team</h2>
            <p className="subheader h2 center">
              Our amazing team is global and diverse.
              <br className="careers-page__hide-breaks" />
              We stay connected through strong remote work{' '}
              <br className="careers-page__hide-breaks" />
              practices and our love of
              <a
                href={process.env.COOKBOOK_WEBSITE}
                rel="noopener noreferrer"
                target="_blank">
                &nbsp;Food
              </a>
            </p>
          </div>
        </div>
        <TeamStats />
        <StaffMap />
      </div>
    </>
  );
};

export default CareersPage;
