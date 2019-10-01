import './qa-section.scss';
import React from 'react';
import PaneSwitcher from '../pane-switcher';
import {getParameterByName} from 'libs/utils/utils';

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
                  <li>It’s very hard to just repair parts of a fence since the panels are structurally connected.
                     If someone offers you a repair, they may break other parts of the fence as they are removing
                      panels and then it may end up costing you more.</li>
                  <li>If you only repair parts of the fence, you’ll have mismatched panels that have aged differently.
                       This creates a generally undesirable appearance.</li>
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

            <a href="/faq">Read more →</a>
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
                          We use high-grade specifications of fresh base rock, rebar, and a minimum of 4
                          inches of 3500 psi concrete or high-grade pavers, so your new driveway will
                          typically last 20-30 years. For comparison, driveway installations that don’t
                          match our specifications will only last 5-15 years. Cracks are expected in all
                          concrete driveways after even a couple of years but you should experience no
                          structural issues for many years.
                </p>
              </div>
            </div>

            <a href="/faq">Read more →</a>
          </div>
        </PaneSwitcher>
      </div>
    );
  }
}
export default QASection;
