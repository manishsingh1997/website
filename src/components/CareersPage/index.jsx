import React from 'react';

import StaffMap from './StaffMap';
import JobBoard from './JobBoard';
import StaffReviews from './StaffReviews';

import ergeonTeam from 'assets/ergeon-team-photo.jpg';
import imgBeach from 'assets/benefits/Beach.svg';
import imgGrowth from 'assets/benefits/Growth.svg';
import imgLamp from 'assets/benefits/Lamp.svg';
import imgPositiv from 'assets/benefits/Positively.svg';
import imgReimbursements from 'assets/benefits/Reimbursements.svg';
import imgSalary from 'assets/benefits/Salary.svg';

import './index.scss';

class CareersPage extends React.Component {

  render() {
    return (
      <div className="careers-page wrapper-1180">
        <div className="spacing before__is-48 after__is-48">
          <h1 className="center spacing after__is-12">Join Us In Changing The Home Services Industry</h1>
          <p className="subheader h2 center spacing after__is-24">
            Everyone should have access to a job they love
          </p>
          <p>
            We believe that everyone has a right to professional growth and respect regardless of their location.
            Ergeon global staff (aka Ergeoneers) are given meaningful opportunities and support in a kind
            and diverse community. This ensures that our workforce, around the world, has access to career growth,
            amazing work culture, and great benefits.
            <br/><br/>
            We have a fast-growing and diverse team spread across 30+ countries today. Come join us to transform
            the construction industry!
          </p>
        </div>
        <div className="careers-page__img-container">
          <img src={ergeonTeam}/>
        </div>
        <div className="spacing before__is-48 after__is-48">
          <h2 className="center spacing after__is-12">Staff Reviews</h2>
          <p className="subheader h2 center">
            We believe amazing companies start with amazing people.
          </p>
        </div>
        <StaffReviews />
        <JobBoard/>
        <div className="spacing before__is-48 after__is-48">
          <h2 className="center spacing after__is-12">Our Team</h2>
          <p className="subheader h2 center">
            Our amazing team is global and diverse.<br/>
            We stay connected through strong remote work practices and our love of
            <a href={process.env.COOKBOOK_WEBSITE} rel="noopener noreferrer" target="_blank">&nbsp;Food</a>
          </p>
        </div>
        <StaffMap/>
        <div className="spacing before__is-48 after__is-48">
          <h2 className="center spacing after__is-12">Company Benefits</h2>
          <p className="subheader h2 center restricted-620">
            In addition to flexible work hours, remote happy hours and team events
            here are a few of the perks we offer.
          </p>
        </div>
        <div className="cards two-columns restricted-940">
          <div className="card cards__card">
            <div className="cards__card__title spacing after__is-6">
              <span className="additional-header h2">Positively Affect Lives</span>
              <img src={imgPositiv}/>
            </div>
            <p>
              Help reinvent a legacy industry and improve the lives of both consumers and contractors.
            </p>
          </div>
          <div className="card cards__card">
            <div className="cards__card__title spacing after__is-6">
              <span className="additional-header h2">Competitive Compensation</span>
              <img src={imgSalary}/>
            </div>
            <p>
              We offer globally competitive salary and stock options.
            </p>
          </div>
          <div className="card cards__card">
            <div className="cards__card__title spacing after__is-6">
              <span className="additional-header h2">Exponential Growth</span>
              <img src={imgGrowth}/>
            </div>
            <p>
              We’re growing even faster than we anticipated. We have big ambitions for where we want to go.
            </p>
          </div>
          <div className="card cards__card">
            <div className="cards__card__title spacing after__is-6">
              <span className="additional-header h2">Interesting problems</span>
              <img src={imgLamp}/>
            </div>
            <p>
              Solve interesting problems that directly impact customer happiness and company growth.
            </p>
          </div>
          <div className="card cards__card">
            <div className="cards__card__title spacing after__is-6">
              <span className="additional-header h2">Work from the Beach</span>
              <img src={imgBeach}/>
            </div>
            <p>
              You have the freedom to work from anywhere (including the Bahamas)!
            </p>
          </div>
          <div className="card cards__card">
            <div className="cards__card__title spacing after__is-6">
              <span className="additional-header h2">Reimbursements</span>
              <img src={imgReimbursements}/>
            </div>
            <p>
              Get reimbursed for software tools, workplace improvements or wellness perks.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CareersPage;
