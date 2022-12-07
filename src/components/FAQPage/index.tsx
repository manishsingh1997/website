import React from 'react';

import './index.scss';

import FAQContent from './FAQContent';
import FAQHeader from './FAQHeader';

const FAQPage = () => {
  return (
    <div className="faq-page">
      <FAQHeader />
      <FAQContent />
    </div>
  );
};

export default FAQPage;
