import React from 'react';

import StaffMap from './StaffMap';
import JobBoard from './JobBoard';
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
          <p className="subheader h2 center">
            We’re using technology to democratize the way consumers improve their home.
            <br/>Simpler.  Faster.  Better Value.
          </p>
        </div>
        <div className="careers-page__img-container">
          <img src={ergeonTeam}/>
        </div>
        <div className="spacing before__is-48 after__is-48">
          <h2 className="center spacing after__is-12">Our Team</h2>
          <p className="subheader h2 center">
            The Ergeon team is global and diverse.
          </p>
        </div>
        <StaffMap/>
        <JobBoard/>
        <div className="spacing before__is-48 after__is-48">
          <h2 className="center spacing after__is-12">Company Benefits</h2>
          <p className="subheader h2 center restricted-620">
            In addition to flexible work hours, remote happy hours and team events
            here are a few of the perks we offer.
          </p>
        </div>
        <div className="cards two-columns">
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
