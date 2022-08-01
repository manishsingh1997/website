import '@testing-library/jest-dom';
import moment from 'moment';

import approvedQuoteMock from '../__mocks__/data/ApprovedQuote';

import { QuoteApproval } from '../types';

import {
  isSignOffPDFView,
  isDirectPreview,
  isQuoteApprovalReviewed,
  isScopeChange,
  getTotalPrice,
  getProjectTotalPrice,
  getTotalPreviouslyApprovedPrice,
  getIsQuoteStatusApprovedOrCompleted,
} from '../utils';

const approvedQuote = approvedQuoteMock as unknown as QuoteApproval;

describe('utils', () => {
  it('should isSignOffPDFView return true when pathname includes /sign-off', () => {
    const pathname = 'http://ergeon.local:6600/app/UhsUWa-wasw1UoT1C/quote-approvals/GUhVg7V3oE_NUEoz/sign-off';
    expect(isSignOffPDFView(pathname)).toBeTruthy();
  });
  it('should isSignOffPDFView return false when pathname not includes /sign-off', () => {
    const pathname = 'http://ergeon.local:6600/app/UhsUWa-wasw1UoT1C/quote-approvals/GUhVg7V3oE_NUEoz';
    expect(isSignOffPDFView(pathname)).toBeFalsy();
  });
  it('should isDirectPreview return false when path match donth with DIRECT_PREVIEW_SLUG', () => {
    const pathname = '/app/CP2YrQ-wamOUoT1C/quote-approvals/GUhVg7V3oE_NUEoz';
    expect(isDirectPreview(pathname)).toBeFalsy();
  });
  it('should isQuoteApprovalReviewed return true when reviewed_at is truthy', () => {
    expect(isQuoteApprovalReviewed(approvedQuote.quote)).toBeTruthy();
  });
  it('should isScopeChange return true when is_scope_change is true', () => {
    expect(isScopeChange(approvedQuote)).toBeTruthy();
  });
  it('should getTotalPrice return 2000', () => {
    expect(getTotalPrice(approvedQuote)).toBe(2000);
  });
  it('should getProjectTotalPrice return 36637', () => {
    expect(getProjectTotalPrice(approvedQuote)).toBe(36637);
  });
  it('should getTotalPreviouslyApprovedPrice return 34637', () => {
    expect(getTotalPreviouslyApprovedPrice(approvedQuote)).toBe(34637);
  });
  // it('should getIsQuoteStatusApprovedOrCompleted true if quote status is approved', () => {
  //   // we have a static date, in order to make this test pass we need to adjust it, otherwise it will return false
  //   approvedQuote.quote.expires_at = moment(approvedQuote.quote.expires_at).add(10, 'day').toISOString();
  //   expect(getIsQuoteStatusApprovedOrCompleted(approvedQuote)).toBeTruthy();
  // });
});
