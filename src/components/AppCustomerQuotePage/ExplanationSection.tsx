import React from 'react';

import {ReactSVG} from 'react-svg';

import './ExplanationSection.scss';
import ContractBlock from './ContractBlock';
import {ExplanationSectionProps, mockExplanationConstantType} from './types';
import {mockExplanationData} from './__mocks__/data/ExplanationSection.constant';

const ExplanationSection = ({asPDF, contractUrl, quoteType}: ExplanationSectionProps) => (
  <div className="explanation-section card padding-40 soft-border page-break">
    <div className="heading-md-text spacing after__is-24">After you approve the quote</div>
    {mockExplanationData.map((explanationSection: mockExplanationConstantType) => (
      <div className="text-block restricted-720" key={explanationSection.heading}>
        <div className="title-wrapper spacing after__is-12">
          <ReactSVG src={explanationSection.svgUrl} />
          <h3 className="additional-header h3">{explanationSection.heading}</h3>
        </div>
        <div dangerouslySetInnerHTML={{__html: explanationSection.description}} />
      </div>
    ))}
    {!asPDF && <ContractBlock contractUrl={contractUrl} quoteType={quoteType} />}
  </div>
);

export default ExplanationSection;
