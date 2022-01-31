import React from 'react';

import imgBeach from '../../assets/benefits/Beach.svg';
import imgGrowth from '../../assets/benefits/Growth.svg';
import imgLamp from '../../assets/benefits/Lamp.svg';
import imgPositiv from '../../assets/benefits/Positively.svg';
import imgReimbursements from '../../assets/benefits/Reimbursements.svg';
import imgSalary from '../../assets/benefits/Salary.svg';

const Benefits = () => {
  return (
    <div className="cards two-columns restricted-940">
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <span className="additional-header h2">Positively Affect Lives</span>
          <img src={imgPositiv} />
        </div>
        <p>
          Help reinvent a legacy industry and improve the lives of both
          consumers and contractors.
        </p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <span className="additional-header h2">Competitive Compensation</span>
          <img src={imgSalary} />
        </div>
        <p>We offer globally competitive salary and stock options.</p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <span className="additional-header h2">Exponential Growth</span>
          <img src={imgGrowth} />
        </div>
        <p>
          We’re growing even faster than we anticipated. We have big ambitions
          for where we want to go.
        </p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <span className="additional-header h2">Interesting problems</span>
          <img src={imgLamp} />
        </div>
        <p>
          Solve interesting problems that directly impact customer happiness and
          company growth.
        </p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <span className="additional-header h2">Work from the Beach</span>
          <img src={imgBeach} />
        </div>
        <p>
          You have the freedom to work from anywhere (including the Caribbean)!
        </p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <span className="additional-header h2">Reimbursements</span>
          <img src={imgReimbursements} />
        </div>
        <p>
          Get reimbursed for software tools, workplace improvements or wellness
          perks.
        </p>
      </div>
    </div>
  );
};

export default Benefits;
