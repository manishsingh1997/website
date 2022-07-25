import moment from 'moment';
import {Quote} from '../types';
import {DIRECT_PREVIEW_SLUG} from '../../website/constants';
import {updateCustomerSignOffRequirement} from '../../api/app';
import {QuoteApproval, SignatureData} from './types';

export const isSignOffPDFView = (pathname: string) => {
  return pathname.includes('/sign-off');
};

export const isDirectPreview = (path: string) => {
  return new RegExp(`${DIRECT_PREVIEW_SLUG}/?`).test(path);
};

export const isQuoteApprovalReviewed = (quote: Quote) => {
  return quote['reviewed_at'] !== null;
};

export const isQuoteApprovalApproved = (quote: Quote) => {
  return quote['approved_at'] !== null;
};

export const isScopeChange = (quoteApproval: QuoteApproval) => {
  return quoteApproval.quote && quoteApproval.quote['is_scope_change'] == true;
};

export const getTotalPrice = (quote: QuoteApproval) => {
  const totalPrice = Number.parseFloat(quote['total_price']);
  return totalPrice;
};

export const getProjectTotalPrice = (quoteApproval: QuoteApproval) => {
  return Number.parseFloat(quoteApproval['project_total_price']);
};

export const getTotalPreviouslyApprovedPrice = (quoteApproval: QuoteApproval) => {
  if (isScopeChange(quoteApproval)) {
    return Number.parseFloat(quoteApproval['previously_approved_price']);
  }
  return 0;
};

export const getSignatureData = async (
  customerGID: string,
  secret: string,
  value: string,
  type: string
): Promise<SignatureData | null> => {
  if (!value || !type) return null;

  const signOffPhrase = type === 'draw' ? 'signoff_img' : 'signoff_text';
  const {data} = await updateCustomerSignOffRequirement(customerGID, secret, {
    [signOffPhrase]: value,
    signoff_type: type,
  });
  const {signoff_img, signoff_at, signoff_pdf} = data || {};

  let newSignatureData = null;

  if (signoff_img) {
    newSignatureData = {
      value: signoff_img,
      type: 'draw', // so it can be displayed as image
      signedDate: signoff_at,
      signedPDF: signoff_pdf,
    };
  }

  return newSignatureData as SignatureData | null;
};

export const getIsQuoteStatusApprovedOrCompleted = (quoteApproval: QuoteApproval) => {
  const approvedAt = quoteApproval.quote.approved_at;
  const quoteStatus = quoteApproval.quote?.status?.label.toLocaleLowerCase();
  const quoteExpiredDate = quoteApproval.quote?.expires_at ||  moment().add('day', 2).toISOString();
  const isNotExpired = quoteExpiredDate
    ? moment(quoteExpiredDate).isAfter(new Date())
    : false;
  const allowedStatus = ['approved', 'completed'];
  return !!approvedAt && isNotExpired && allowedStatus.includes(quoteStatus);
};
