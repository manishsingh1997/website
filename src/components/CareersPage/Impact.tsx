import React from 'react';

import imgGrowth from '@ergeon/core-components/src/assets/careers-page/Growth.svg';
import imgLamp from '@ergeon/core-components/src/assets/careers-page/Lamp.svg';
import imgPositive from '@ergeon/core-components/src/assets/careers-page/Positively.svg';
import imgGlobe from '@ergeon/core-components/src/assets/careers-page/icon-globe.svg';

const Impact = () => {
  return (
    <div className="cards two-columns restricted-940">
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <p className="additional-header h2">Positively Impact Lives</p>
          <img alt="impact" src={imgPositive} />
        </div>
        <p className="cards_card_description">
          Help transform an outdated industry & improve the lives of customers
          and service professionals.
        </p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <p className="additional-header h2">Interesting Problems</p>
          <img alt="interesting problems" src={imgLamp} />
        </div>
        <p className="cards_card_description">
          Solve interesting problems that directly impact customer happiness and
          company growth.{' '}
        </p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <p className="additional-header h2">Exponential Growth</p>
          <img alt="Exponential growth" src={imgGrowth} />
        </div>
        <p className="cards_card_description">
          We’re growing faster than we expected. We have big ambitions for where
          we want to go.
        </p>
      </div>
      <div className="card cards__card">
        <div className="cards__card__title spacing after__is-6">
          <p className="additional-header h2">Global Team</p>
          <img alt="Global team" src={imgGlobe} />
        </div>
        <p className="cards__card__description">
          We have a diverse team spread across 35+ countries.
        </p>
      </div>
    </div>
  );
};

export default Impact;
