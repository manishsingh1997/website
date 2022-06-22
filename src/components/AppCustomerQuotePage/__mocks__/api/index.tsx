/* eslint-disable @typescript-eslint/no-unused-vars */
import quoteApproval from '../data/quoteApproval';

// @ts-ignore
export const getQuoteApprovalDetails = (customerGID: string, quoteApprovalSecret: string) => {
  return Promise.resolve({
    data: quoteApproval,
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
export const getCustomerSignOffData = (configID: string) => {
  return {
    data: {
      signoff_at: null,
      signoff_by: null,
      signoff_pdf: null,
      signoff_img: null,
    },
  };
};

// @ts-ignore
export const updateCustomerSignOffRequirement = (customerGID: string, data: Record<string, string>) => {
  return {
    data: {
      signoff_img: data.value,
      signoff_by: '1',
      signoff_at: new Date().toDateString(),
      signoff_pdf: '',
    },
  };
};
