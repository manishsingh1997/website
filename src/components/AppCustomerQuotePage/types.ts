import {ReactElement} from 'react';

// eslint-disable-next-line import/named
import {match} from 'react-router-dom';

import {AuthState} from '../../flux/reducers/auth';
import {Quote, QuoteLine} from '../types';

type Layout = {
  phoneNumber: string;
};

export type Params = {
  secret: string;
  path: string;
  quoteId?: string;
};

type BasePageProps = {
  match: match<Params>;
  auth: AuthState;
};

export type SignatureType = 'draw' | 'text';

export type SignatureData = {
  value: string;
  type: SignatureType;
  signedDate: string;
  signedPDF?: string;
};

export type OrderData = {
  orderId: string;
  customerName: string;
  customerAddress: string;
  quoteDate: string;
};

type Address = {
  formatted_address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
};

export type Customer = {
  id: number;
  user_id: number;
  gid: string;
  full_name: string;
  email: string;
  phone_number: string;
  main_address: Address;
};

export type PaymentMethod = {
  card_last_digits: string;
  card_expiration_date: string;
  card_expiration_date_short: string;
};

export interface QuoteApproval {
  id: number;
  customer: Customer;
  is_primary: boolean;
  total_price: string;
  reviewed_at: string;
  approved_at: unknown;
  secret: string;
  quote: Quote;
  quote_approval_lines: QuoteLine[];
  payment_method: unknown;
  other_quote_approvals: unknown[];
  new_quote_approval: Quote | null;
  last_approved_project_revision_quote_approval: Quote | null;
  customer_pdf: string;
  contract_pdf: string;
  merged_customer_pdf: string;
  previously_approved_price: string;
  project_total_price: string;
  signoff_at: string;
  signoff_by: string;
  signoff_pdf: string;
  signoff_img: string;
}

export type AppCustomerQuotePageProps = {
  setPDFHeaderPhoneAction: (value: number) => void;
  layout: Layout;
  quoteFallback?: ReactElement;
} & BasePageProps;

export type QuoteBodyProps = {
  approveQuoteApproval: (stripeToken: string) => void;
  customerGID: string;
  paymentMethod: PaymentMethod | null;
  paymentMethodError: string | null;
  quoteApproval: QuoteApproval;
  shouldShowSignoffComponents?: boolean;
} & BasePageProps;

type SignOffCommonProps = {
  customerSignOffData: OrderData;
  isCustomerSigned: boolean;
  isSignLoading: boolean;
  onSubmitSignature: (value: string, type: string) => void;
  signatureData: SignatureData;
};

export type DefaultContentProps = QuoteBodyProps & SignOffCommonProps;

export type SignOffPdfProps = {
  asPDF: boolean;
  quoteApproval: QuoteApproval;
} & SignOffCommonProps;
