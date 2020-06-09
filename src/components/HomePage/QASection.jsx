import React from 'react';
import PaneSwitcher from './PaneSwitcher';
import {getParameterByName} from 'utils/utils';

import './QASection.scss';

class QASection extends React.Component {
  render() {
    return (
      <div className="qa-section">
        <h3 className="">Questions & Answers</h3>
        <PaneSwitcher defaultPane={getParameterByName('utm_content') === 'driveway' ? 1 : 0}>
          <div data-name="Fence 101">
            <div className="qa-section__questions-wrapper">
              <div className="qa-section__question">
                <h6>Why should I replace my fence vs repairing it?</h6>
                <ul>
                  <li>
                    {/* eslint-disable-next-line max-len */}
                    If multiple components are damaged on the fence, then it may be more cost effective to just replace the whole fence.
                    {/* eslint-disable-next-line max-len */}
                    Aside from the extra time to carefully dissemble and salvage existing fence components, components tend to lose some structural integrity in the process of removing and re-adding nails.
                  </li>
                  <li>
                    {/* eslint-disable-next-line max-len */}
                    A fully replaced fence will also ensure visual consistency, and hence be more aesthetically appealing.
                    Your new fence will come with a 5 year warranty and with proper care can last around 25 years.
                  </li>
                </ul>
              </div>
              <div className="qa-section__question">
                <h6>How much should I expect to spend on my fence installation?</h6>
                <p>
                  Your fence installation depends on linear footage and the type of fence you choose. To provide you a
                  fast and hassle-free quote, we create an exterior blueprint of your property through publicly
                  available satellite imagery and base your price off those measurements.
                </p>
              </div>
              <div className="qa-section__question">
                <h6>Do you provide split billing?</h6>
                <p>
                  Since our contract is with you, we are legally obligated to only bill you for the service.
                  That being said, our detailed quote provides a cost break-down by side, in order to facilitate
                  any financial conversations you may want to have with your neighbors.
                </p>
              </div>
              <div className="qa-section__question">
                <h6>How long does installation take?</h6>
                <p>
                  It typically takes one day to install 60 feet of fencing. On the first day of
                  the job, we’ll take down and safely dispose of the old fence.
                </p>
              </div>
            </div>

            <a href="/help/201900004">Read more →</a>
          </div>
          <div data-name="Driveway 101">
            <div className="qa-section__questions-wrapper">
              <div className="qa-section__question">
                <h6>Why should I replace my driveway vs. repairing it?</h6>
                <p>
                  It’s very hard to just repair parts of the driveway since the sections are connected.
                  If someone breaks apart the existing section to replace it, it can easily break
                  adjacent sections as well, which will cost you more. The new section also may
                  not match in color with the old section as concrete and pavers do change appearance
                  as they age. Crack repair is potentially possible but it does not structurally
                  repair the slab and the aesthetics will never match. A full replacement addresses
                  these concerns.
                </p>
              </div>
              <div className="qa-section__question">
                <h6>How much should I expect to spend on my driveway installation?</h6>
                <p>
                  Your driveway installation price depends both on the square footage,
                  the type of materials you choose, and site factors such as soil type,
                  drainage, or vegetation around the driveway such as large trees. To provide
                  you a fast and hassle-free quote, we create an exterior blueprint of your
                  property through publicly available satellite imagery and base your price
                  off those measurements.
                </p>
              </div>
              <div className="qa-section__question">
                <h6>How long does installation take?</h6>
                <p>
                  A typical installation takes 3-5 days for 600-800 square feet. On day one, we will
                  demo the existing driveway, excavate the area, and haul away the debris.
                  Then we will lay down the base rock and install rebar for structural rigidity.
                </p>
              </div>
              <div className="qa-section__question">
                <h6>How long will my new driveway last?</h6>
                <p>
                  We use high-grade specifications of fresh base rock, rebar, and a minimum of 2
                  inches of 3000 psi concrete or high-grade pavers, so your new driveway will
                  typically last 20-30 years. For comparison, driveway installations that don’t
                  match our specifications will only last 5-15 years. Cracks are expected in all
                  concrete driveways after even a couple of years but you should experience no
                  structural issues for many years.
                </p>
              </div>
            </div>

            <a href="/help/201900003">Read more →</a>
          </div>
        </PaneSwitcher>
      </div>
    );
  }
}
export default QASection;
