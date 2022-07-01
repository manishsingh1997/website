import React, {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';

import {constants, utils} from '@ergeon/core-components';

import {CONTACT_EMAIL} from '../../website/constants';
import Success from '../common/Success';
import ContactUsForm from './ContactUsForm';

import './index.scss';

const ContactUsPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const openSuccessDisplay = useCallback(() => { 
    setShowSuccess(true);
  }, [setShowSuccess]);

  return showSuccess ? (
    <div className="contact-us-page">
      <Success header="We’ll be in touch shortly" text="Our team will reach out within 24 hours" />
    </div>
    ) : (
    <div className="contact-us-page">
      <div className="shadow-block">
        <div className="contact-us-page__header wrapper-1180">
          <div className="wrapper-480">
            <h1 className="h2">Contact Us</h1>
            <div className="subheader h6 spacing before__is-6">
              We’re here to help! Get in touch and our team will answer your questions as soon as possible. You can also
              find answers on our <Link to="/help">Help Center.</Link>
            </div>
          </div>
          <div className="contact-us-area">
            <div className="contact-us-page__contact-us-form card shadow soft-border">
              <ContactUsForm onSubmit={openSuccessDisplay} />
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
            <a data-track-call="true" href={`tel:${constants.PHONE_NUMBER}`}>
                {utils.formatPhoneNumber(constants.PHONE_NUMBER)}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
