import React from 'react';

import {render, screen} from '@testing-library/react';

import '@testing-library/jest-dom';
import ExplanationSectionMock from '../__mocks__/data/ExplanationSection';
import {ExplanationSectionProps} from '../types';
import ExplanationSection from '../ExplanationSection';

const mockExplainationSectionMockProps = ExplanationSectionMock as ExplanationSectionProps;

describe('Explanation Section', () => {
  test('Should display Explanation Section', () => {
    render(
      <ExplanationSection
        asPDF={mockExplainationSectionMockProps.asPDF}
        contractUrl={mockExplainationSectionMockProps.contractUrl}
        quoteType={mockExplainationSectionMockProps.quoteType}
      />
    );
    expectExplanationSectionToBeVisible();
  });

  test('Should match the contract url in the After you approve the quote section', () => {
    render(
      <ExplanationSection
        asPDF={mockExplainationSectionMockProps.asPDF}
        contractUrl={mockExplainationSectionMockProps.contractUrl}
        quoteType={mockExplainationSectionMockProps.quoteType}
      />
    );

    expect(screen.getByText('Scheduling').matches('Scheduling'));
    expect(screen.getByText('Initial walkthrough').matches('Initial walkthrough'));
    expect(screen.getByText('Final walkthrough and sign off').matches('Final walkthrough and sign off'));
    expect(screen.getByText('Billing').matches('Billing'));
  });
});

const expectExplanationSectionToBeVisible = () => {
  expect(screen.getByText('After you approve the quote').matches('After you approve the quote'));
};
