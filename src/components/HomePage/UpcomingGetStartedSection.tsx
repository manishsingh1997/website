import React from 'react';

import imgGetStarted from 'assets/easy-to-use.png';

import './UpcomingGetStartedSection.scss';

const UpcomingGetStartedSection = () => {
  return (
    <div className="GetStarted is-Before--60">
      <div className="GetStarted-Wrapper">
        <div className="GetStarted-Content is-Before--16 is-RightMargin--20">
          <div>
            <h3 className="GetStarted-Title">
              Get Started In 4 Simple Steps
            </h3>
            <ol className="ordered-list neat is-Before--36">
              <li className="is-After--24">Enter your address and we’ll call you within 24 hours</li>
              <li className="is-After--24">Receive a custom quote after onsite consultation</li>
              <li className="is-After--24">Book your installation appointment</li>
              <li>Have your project installed within 2 weeks</li>
            </ol>
          </div>
        </div>
        <div className="ImgContainer">
          <img src={imgGetStarted}/>
        </div>
      </div>
    </div>
  );
};

export default UpcomingGetStartedSection;
