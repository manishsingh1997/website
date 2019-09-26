import React from 'react';
import MetaTags from 'react-meta-tags';

import {Accordion} from '@ergeon/core-components';
import faqData from 'data/faq-data';
import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';
import './faq-page.scss';

class FAQPage extends React.Component {

  renderFAQGroup({title, questions}, index) {
    return (
      <div className="faq-page__group" key={index}>
        <h3 className="spacing before__is-30 after__is-24">
          {title}
        </h3>
        <div className="faq-page__group-questions">
          <Accordion items={questions.map(({question, answer}) => ({title: question, content: answer}))} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="faq-page">
        <MetaTags>
          <title>FAQ | ergeon.com</title>
          <meta
            content="Frequently Asked Questions. Pricing & Payment, Service Policies, Warranty, Split billing, etc."
            name="description"/>
          <meta
            content="Frequently Asked Questions. Pricing & Payment, Service Policies, Warranty, Split billing, etc."
            property="og:description"/>
        </MetaTags>
        <div className="faq-page__header">
          <div className="wrapper-1180">
            <div className="full-width-block">
              <div className="spacing after__is-48">
                <h1 className="white spacing after__is-12">
                  Frequently Asked Questions
                </h1>
                <div className="subheader h2 white">
                  Feel free to <a className="faq-page__call-us" href={`tel:${PHONE_NUMBER}`}>call us </a>
                  if you dont find your answer here
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="wrapper-1180">
          <div className="faq-page__content width-restricted to-620 spacing before__is-48">
            {faqData.map(this.renderFAQGroup.bind(this))}
          </div>
        </div>
      </div>
    );
  }
}

export default FAQPage;