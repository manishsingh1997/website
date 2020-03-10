import React from 'react';
import {ReactSVG} from 'react-svg';
import ImgCalendar from 'assets/icon-calendar.svg';
import ImgInitial from 'assets/icon-initial-walkthrough.svg';
import ImgFinal from 'assets/icon-final-walkthrough.svg';
import ImgBilling from 'assets/icon-billing.svg';
import './ExplanationSection.scss';
import PropTypes from 'prop-types';
import config from 'website/config';

export default class ExplanationSection extends React.Component {
  static propTypes = {
    asPDF: PropTypes.bool,
    warrantyLink: PropTypes.string,
  };
  renderWarrantyBlock() {
    const {warrantyLink} = this.props;
    return (
      <div>
        <hr className="gray-line restricted-720"/>
        <h4 className="spacing before__is-48 after__is-12">Warranty</h4>
        <div>
        Read our fence warranty <a href={warrantyLink}>here</a>.
        </div>
      </div>
    );
  }
  render() {
    const {asPDF} = this.props;
    return (
      <div className="explanation-section card padding-40 soft-border page-break">
        <h4 className="spacing after__is-24">After you approve the quote</h4>
        <div className="text-block restricted-720">
          <div className="title-wrapper spacing after__is-12">
            <ReactSVG src={ImgCalendar}/>
            <h3 className="additional-header h3">Scheduling</h3>
          </div>
          After accepting your quote, our project management team will be in touch with you within a week
          to discuss next steps, and get you scheduled as soon as possible!
        </div>
        <div className="text-block restricted-720">
          <div className="title-wrapper spacing after__is-12">
            <ReactSVG src={ImgInitial}/>
            <h3 className="additional-header h3">Initial walkthrough</h3>
          </div>
          The day of the project start, we ask you to please be home between 8–10am, so you can go over
          the project specifications with our installer.
        </div>
        <div className="text-block restricted-720">
          <div className="title-wrapper spacing after__is-12">
            <ReactSVG src={ImgFinal}/>
            <h3 className="additional-header h3">Final walkthrough and sign off</h3>
          </div>
          At the end of the job, we’ll do a final walkthrough to confirm you’re happy with
          the project and get your sign off.
        </div>
        <div className="text-block restricted-720">
          <div className="title-wrapper spacing after__is-12">
            <ReactSVG src={ImgBilling}/>
            <h3 className="additional-header h3">Billing</h3>
          </div>
          You’ll be charged after your project is complete. Payments made via paper check or e-check will be
          charged at the amount listed on your quote. Payments made via credit card will be subject to an
          additional {config.CARD_TRANSACTION_FEE} transaction fee.
        </div>
        {!asPDF && this.renderWarrantyBlock()}
      </div>
    );
  }
}