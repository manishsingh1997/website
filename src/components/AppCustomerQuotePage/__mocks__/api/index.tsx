/* eslint-disable @typescript-eslint/no-unused-vars */
import CancelledQuote from '../data/CancelledQuote';
import ApprovedQuote from '../data/SignOffApprovedQuote';

type SignOffRequestData = {signoff_img?: string; signoff_text?: string};

// @ts-ignore
export const ApprovedQuoteDetails = (customerGID: string, quoteApprovalSecret: string) => {
  return Promise.resolve({
    data: ApprovedQuote,
    status: 200,
    statusText: 'OK',
    headers: '',
    config: {},
  });
};

// @ts-ignore
export const CancelledQuoteDetails = (customerGID: string, quoteApprovalSecret: string) => {
  return Promise.resolve({
    data: CancelledQuote,
    status: 200,
    statusText: 'OK',
    headers: '',
    config: {},
  });
};

// @ts-ignore
export const reviewQuoteApproval = (customerGID: string, quoteApprovalSecret: string) => {
  return Promise.resolve({
    data: '',
    status: 200,
    statusText: 'OK',
    headers: '',
    config: {},
  });
};

// @ts-ignore
export const updateCustomerSignOffRequirement = (customerGID, quoteApprovalSecret, data: SignOffRequestData) => {
  return Promise.resolve({
    data: {
      signoff_img: data?.signoff_img || data?.signoff_text,
      signoff_by: '1',
      signoff_at: new Date().toDateString(),
      signoff_pdf: '',
    },
    status: 200,
    statusText: 'OK',
    headers: '',
    config: {},
  });
};
