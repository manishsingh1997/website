import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import QuoteApprovalError from '../QuoteApprovalError';

describe('<QuoteApprovalError />', () => {
  it('should render with quoteApprovalError', () => {
    const error = 'There was an error trying to retrieve quote.';
    render(<QuoteApprovalError quoteApprovalError={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });
  it('should render Quote Inconsistency error by default', () => {
    const error = 'The quote is missing an address and cannot be displayed. Please message your Ergeon representative.';
    render(<QuoteApprovalError quoteApprovalError={null} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
