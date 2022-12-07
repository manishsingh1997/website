import React from 'react';

// @ts-ignore
import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';

const FAQHeader = () => (
  <div className="faq-page__header">
    <div className="wrapper-1180">
      <div className="full-width-block">
        <div className="spacing after__is-48">
          <h1 className="white spacing after__is-12">Frequently Asked Questions</h1>
          <div className="subheader h2 white">
            Feel free to{' '}
            <a className="faq-page__call-us" data-track-call="true" href={`tel:${PHONE_NUMBER}`}>
              call us{' '}
            </a>
            if you dont find your answer here
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FAQHeader;
