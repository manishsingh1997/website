import React from 'react';

import faqData from '../../data/faq-data';

import FAQQuestion from './FAQQuestion';

const FAQContent = () => {
  return (
    <div className="wrapper-1180">
      <div className="faq-page__content width-restricted to-620 spacing before__is-48">
        {faqData.map((item, index) => (
          <FAQQuestion key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default FAQContent;
