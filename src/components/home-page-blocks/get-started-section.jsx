import React from 'react';
import './get-started-section.scss';
import imgGetStarted from '../../assets/easy-to-use.jpg';
import imgTrusted from '../../assets/trusted provider.svg';
import imgCard from '../../assets/card.svg';
import imgBuck from '../../assets/buck.svg';
import imgSmile from '../../assets/smile.svg';
class GetStartedSection extends React.Component {
  render() {
    return (
      <div className="get-started">
        <div className="get-started__wrapper">
          <div className="get-started__content">
            <div>
              <h3 className="">
                Get Started In 4 Simple Steps
              </h3>
              <ol className="ordered-list neat">
                <li>Enter your address and we’ll call you within 24 hours</li>
                <li>Get custom quote after onsite consultation</li>
                <li>Schedule your installation</li>
                <li>Get your project installed</li>
              </ol>
            </div>

          </div>
          <div className="get-started__img-container">
            <img src={imgGetStarted}/>
          </div>
        </div>
        <div className="get-started__features">
          <div className="get-started__features__feature">
            <img src={imgTrusted}/>
            <h6>Trusted provider</h6>
          </div>
          <div className="get-started__features__feature">
            <img src={imgCard}/>
            <h6>High tech, easy to use</h6>
          </div>
          <div className="get-started__features__feature">
            <img src={imgBuck}/>
            <h6>Reliable and transparent</h6>
          </div>
          <div className="get-started__features__feature">
            <img src={imgSmile}/>
            <h6>Excellent communication</h6>
          </div>
        </div>
      </div>
    );

  }
}

export default GetStartedSection;