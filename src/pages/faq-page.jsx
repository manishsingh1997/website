import React from 'react';
import {Accordion} from '@ergeon/core-components';
import faqData from 'data/faq-data';

import './faq-page.scss';

class FAQPage extends React.Component {

  renderFAQGroup({title, questions}, index) {
    return (
      <div className="faq-page__group" key={index}>
        <h3 className="spacing before__is-30 after__is-24 additional-header h2">
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
        <div className="faq-page__header">
          <div className="wrapper-1180">
            <div className="full-width-block width-restricted to-620">
              <h2 className="white spacing after__is-48">
                Frequently Asked Questions
              </h2>
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