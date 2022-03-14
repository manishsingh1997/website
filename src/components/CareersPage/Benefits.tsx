import React from 'react';

import imgBeach from '@ergeon/core-components/src/assets/careers-page/Beach.svg';
import imgSalary from '@ergeon/core-components/src/assets/careers-page/Salary.svg';
import imgRemote from '@ergeon/core-components/src/assets/careers-page/icon-remote.svg';
import imgTech from '@ergeon/core-components/src/assets/careers-page/icon-tech.svg';

const Benefits = () => {
  return (
    <div className="cards two-columns restricted-940">
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <span className="additional-header h2">Competitive Compensation</span>
          <img src={imgSalary} />
        </div>
        <p>
          We are well funded by VCs and able to offer globally competitive
          salaries.
        </p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <span className="additional-header h2">Strong Remote Practices</span>
          <img src={imgRemote} />
        </div>
        <p>
          We stay connected through the best remote work practices and sharing
          <a
            href={process.env.COOKBOOK_WEBSITE}
            rel="noopener noreferrer"
            target="_blank">
            {' '}
            our love of&nbsp;food!
          </a>
        </p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <span className="additional-header h2">Tech & Wellness Fund</span>
          <img src={imgTech} />
        </div>
        <p>
          We reimburse our staff for software tools, workplace improvements and
          wellness perks.
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
    </div>
  );
};

export default Benefits;
