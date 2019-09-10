import React from 'react';
import './careers-page.scss';
import StaffMap from '../components/staff-map';
import JobBoard from '../components/greenhouse-job-board';
import ergeonTeam from '../assets/ergeon-team-photo.jpg';
import imgBeach from '../assets/benefits/Beach.svg';
import imgGrowth from '../assets/benefits/Growth.svg';
import imgLamp from '../assets/benefits/Lamp.svg';
import imgPositiv from '../assets/benefits/Positively.svg';
import imgReimbursements from '../assets/benefits/Reimbursements.svg';
import imgSalary from '../assets/benefits/Salary.svg';
class CareersPage extends React.Component {

  render() {
    return (
      <div className="careers-page wrapper-1180">
        <div className="section-title">
          <h2 className="center">Join Us In Changing The Home Services Industry</h2>
          <p className="additional-header h2 center">
              We’re using technology to democratize the way consumers improve their home.
            <br/>Simpler.  Faster.  Better Value.
          </p>
        </div>
        <div className="careers-page__img-container">
          <img src={ergeonTeam}/>
        </div>
        <div className="section-title">
          <h2 className="center">Our Team</h2>
          <p className="additional-header h2 center">
              The Ergeon team is global and diverse.
          </p>
        </div>
        <StaffMap/>
        <JobBoard/>
        <div className="section-title">
          <h2 className="center">Company Benefits</h2>
          <p className="additional-header h2 center restricted-620">
            In addition to flexible work hours, remote happy hours and team events
            here are a few of the perks we offer.
          </p>
        </div>
        <div className="cards">
          <div className="cards__card">
            <div className="cards__card__title">
              <h4 className="additional-header h4">Positively Affect Lives</h4>
              <img src={imgPositiv}/>
            </div>
            <p>
              Help reinvent a legacy industry and improve the lives of both consumers and contractors.
            </p>
          </div>
          <div className="cards__card">
            <div className="cards__card__title">
              <h4 className="additional-header h4">Competitive Compensation</h4>
              <img src={imgSalary}/>
            </div>
            <p>
              We offer globally competitive salary and stock options.
            </p>
          </div>
          <div className="cards__card">
            <div className="cards__card__title">
              <h4 className="additional-header h4">Exponential Growth</h4>
              <img src={imgGrowth}/>
            </div>
            <p>
              We’re growing even faster than we anticipated. We have big ambitions for where we want to go.
            </p>
          </div>
          <div className="cards__card">
            <div className="cards__card__title">
              <h4 className="additional-header h4">Interesting problems</h4>
              <img src={imgLamp}/>
            </div>
            <p>
              Solve interesting problems that directly impact customer happiness and company growth.
            </p>
          </div>
          <div className="cards__card">
            <div className="cards__card__title">
              <h4 className="additional-header h4">Work from the Beach</h4>
              <img src={imgBeach}/>
            </div>
            <p>
              You have the freedom to work from anywhere (including the Bahamas)!
            </p>
          </div>
          <div className="cards__card">
            <div className="cards__card__title">
              <h4 className="additional-header h4">Reimbursements</h4>
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