import React from 'react';

import Countries from '@ergeon/core-components/src/assets/careers-page/35.svg';
import Ownership from '@ergeon/core-components/src/assets/careers-page/1of2.svg';
import Equality from '@ergeon/core-components/src/assets/careers-page/1of3.svg';
import Leadership from '@ergeon/core-components/src/assets/careers-page/2of3.svg';

import './TeamStats.scss';

const TeamStats = () => {
  return (
    <div className="cards two-columns restricted-940 spacing after__is-48">
      <div className="card cards__card">
        <div className="cards-stats">
          <div className="cards-stats-image">
            <img alt="Countries" src={Countries} />
          </div>
          <div className="cards-stats-title spacing after__is-6">
            <p className="additional-header h2">Countries represented</p>
            <p className="cards-stats-description">
              Our growing team is spread across the globe.
            </p>
          </div>
        </div>
      </div>
      <div className="card cards__card">
        <div className="cards-stats">
          <div className="cards-stats-image">
            <img alt="interesting problems" src={Equality} />
          </div>
          <div className="cards-stats-title spacing after__is-6">
            <p className="additional-header h2">Women at Ergeon</p>
            <p className="cards-stats-description">
              Compared to 1 of 30 in the Construction industry.
            </p>
          </div>
        </div>
      </div>
      <div className="card cards__card">
        <div className="cards-stats">
          <div className="cards-stats-image">
            <img alt="Exponential growth" src={Ownership} />
          </div>
          <div className="cards-stats-title spacing after__is-6">
            <p className="additional-header h2">Women Ownership</p>
            <p className="cards-stats-description">
              Ergeon is a female-owned company.
            </p>
          </div>
        </div>
      </div>
      <div className="card cards__card">
        <div className="cards-stats">
          <div className="cards-stats-image">
            <img alt="Global team" src={Leadership} />
          </div>
          <div className="cards-stats-title spacing after__is-6">
            <p className="additional-header h2">Minority Leadership</p>
            <p className="cards-stats-description">
              Two-thirds of our leadership team are minorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;
