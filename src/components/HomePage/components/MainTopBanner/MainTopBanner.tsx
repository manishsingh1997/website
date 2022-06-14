
import React from 'react';

import CitySearch from '../CitySearch';

import './MainTopBanner.scss';

const MainTopBanner = () => {

  return (
    <section className="MainTopBanner">
      <div className="MainTopBanner-Content">
        <h2 className="MainTopBanner-Content--Heading">
          Improving your outdoor<br /> space can be easy & friendly
        </h2>
        <p className="MainTopBanner-Content--SubHeading">
          Find Ergeon fence expertise in your area
        </p>
        <CitySearch />
      </div>
    </section>
  )
}

export default MainTopBanner;
