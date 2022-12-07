import React from 'react';

import {OptimizedImage} from '@ergeon/core-components';

import imgGetStarted from '../../../../assets/easy-to-use.jpg';

import './GetStartedSection.scss';

const GetStartedSection = () => {
  return (
    <div className="GetStarted">
      <div className="GetStarted-Wrapper">
        <div className="GetStarted-Content is-Before--16 is-RightMargin--20">
          <div>
            <h2 className="h3 GetStarted-Title">Get Started In 4 Simple Steps</h2>
            <ol className="ordered-list neat is-Before--36">
              <li className="is-After--24">Enter your address and we’ll call you within 24 hours</li>
              <li className="is-After--24">Receive a custom quote after onsite consultation</li>
              <li className="is-After--24">Book your installation appointment</li>
              <li>Have your project installed within 2 weeks</li>
            </ol>
          </div>
        </div>
        <div className="GetStarted-ImgContainer">
          <OptimizedImage alt={'Get Started'} className="GetStarted-Image" src={imgGetStarted} />
        </div>
      </div>
    </div>
  );
};

export default GetStartedSection;
