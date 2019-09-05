import React from 'react';
import './get-started-section.scss';
import imgGetStarted from '../assets/easy-to-use.jpg';
import imgTrusted from '../assets/trusted provider.svg';
import imgCard from '../assets/card.svg';
import imgBuck from '../assets/buck.svg';
import imgSmile from '../assets/smile.svg';
class GetStartedSection extends React.Component {
  render() {
    return (
      <div className="get-started">
        <div className="get-started__wrapper">
          <div className="get-started__content">
            <h3 className="additional-header h1">
              Get Started In 4 Simple Steps
            </h3>
            <ol className="ordered-list">
              <li>Enter your address and we’ll call you within 24 hours</li>
              <li>Get custom quote after onsite consultation</li>
              <li>Schedule your installation</li>
              <li>Get your project installed within 2 weeks</li>
            </ol>
          </div>
          <div className="get-started__img-container">
            <img src={imgGetStarted}/>
          </div>
        </div>
        <div className="get-started__features">
          <div className="get-started__features__feature">
            <img src={imgTrusted}/>
            <span>Trusted provider</span>
          </div>
          <div className="get-started__features__feature">
            <img src={imgCard}/>
            <span>High tech, easy to use</span>
          </div>
          <div className="get-started__features__feature">
            <img src={imgBuck}/>
            <span>Reliable and transparent</span>
          </div>
          <div className="get-started__features__feature">
            <img src={imgSmile}/>
            <span>Excellent communication</span>
          </div>
        </div>
      </div>
    );

  }
}

export default GetStartedSection;