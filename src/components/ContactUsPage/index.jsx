import React from 'react';

import './index.scss';
import {Link} from 'react-router-dom';
import ContactUsForm from './ContactUsForm';
import Success from '../common/Success';
import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';
import {formatPhoneNumber} from '@ergeon/core-components/src/libs/utils/utils';
import {CONTACT_EMAIL} from 'website/constants';

class ContactUsPage extends React.Component {
  state = {
    showSuccess: false,
  };

  render() {
    if (this.state.showSuccess) {
      return (
        <div className="contact-us-page">
          <Success header="We’ll be in touch shortly" text="Our team will reach out within 24 hours" />
        </div>
      );
    }

    return (
      <div className="contact-us-page">
        <div className="shadow-block">
          <div className="contact-us-page__header wrapper-1180">
            <div className="wrapper-480">
              <h1 className="h2">Contact Us</h1>
              <div className="subheader h6 spacing before__is-6">
                We’re here to help! Get in touch and our team will answer your questions as soon as possible. You can
                also find answers on our <Link to="/help">Help Center.</Link>
              </div>
            </div>
            <div className="contact-us-area">
              <div className="contact-us-page__contact-us-form card shadow soft-border">
                <ContactUsForm onSubmit={() => this.setState({showSuccess: true})} />
              </div>
            </div>
          </div>
        </div>
        <div className="contact-us-page__body wrapper-1180">
          <div className="email">
            <p>Email:</p>
            <p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>
          <div className="phone">
            <p>Phone:</p>
            <p>
              <a href={`tel:${PHONE_NUMBER}`}>{formatPhoneNumber(PHONE_NUMBER)}</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUsPage;
