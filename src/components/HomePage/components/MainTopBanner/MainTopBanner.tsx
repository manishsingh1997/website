import React from 'react';

import {Helmet} from 'react-helmet';

import CitySearch from '../CitySearch';
import fenceImg from '../../../../assets/fence-background.jpg';

import './MainTopBanner.scss';

const MainTopBanner = () => {
  return (
    <section className="MainTopBanner">
      <Helmet>
        <link as="image" href={fenceImg} rel="preload" />
      </Helmet>
      <div className="MainTopBanner-Content">
        <div className="wrapper-1180">
          <h1 className="h2 MainTopBanner-Content--Heading">
            Improving your outdoor
            <br /> space can be easy & friendly
          </h1>
          <p className="MainTopBanner-Content--SubHeading">Find Ergeon fence expertise in your area</p>
          <CitySearch />
        </div>
      </div>
    </section>
  );
};

export default MainTopBanner;
