import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {some} from 'lodash';
import {useLocation, useHistory} from 'react-router-dom';

import AppLoader from '../common/AppLoader';
import {
  getQuoteApprovalDetails,
  reviewQuoteApproval as reviewQuoteApprovalAPI,
  approveQuoteApproval as approveQuoteApprovalAPI,
} from '../../api/app';
import {getParameterByName, isPDFMode} from '../../utils/utils';
import {parseAPIError} from '../../utils/api';
import {isQuoteAddressValid} from '../../utils/app-order';
import {ErrorResponse} from '../../utils/types';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';

import {getSignatureData, isDirectPreview, isQuoteApprovalReviewed, isSignOffPDFView} from './utils';
import {OrderData, AppCustomerQuotePageProps, ApprovalPayMethod, QuoteApproval, SignatureData} from './types';
import DefaultContent from './DefaultContent';
import QuoteApprovalError from './QuoteApprovalError';
import SignOffPdf from './ProjectSignOff/SignOffPdf';

import '@ergeon/draw-map/styles.css';
import '../common/AppQuoteComponents/index.scss';

const AppCustomerQuotePage = (props: AppCustomerQuotePageProps) => {

  const {match, auth, layout, setPDFHeaderPhoneAction, quoteFallback} = props

  const location = useLocation();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [quoteApproval, setQuoteApproval] = useState<QuoteApproval | null>(null);
  const [quoteApprovalError, setQuoteApprovalError] = useState<string | null>(null);
  const [approvalPayMethod, setApprovalPayMethod] = useState<ApprovalPayMethod | null>(null);
  const [approvalPayMethodError, setApprovalPayMethodError] = useState<string | null>(null);
  const [isSignLoading, setIsSignLoading] = useState(false);
  const [isCustomerSigned, setIsCustomerSigned] = useState(false);
  const [signatureData, setSignatureData] = useState<SignatureData | null>(null);
  const [customerSignOffData, setCustomerSignOffData] = useState<OrderData | null>(null);

  const asPDF = useMemo(() => isPDFMode(), []);

  const isSignOffPDF = useMemo(() => isSignOffPDFView(location.pathname), [location]);

  const customerGID = useContext(CustomerGIDContext);

  const getQuoteApprovalDetailsFromAPI = useCallback(async () => {
    try {
      const data = await getQuoteApprovalDetails(customerGID, match.params.secret);
      const customer = data?.data?.customer;
      const quote = data?.data?.quote;
      const orderData = {
        orderId: quote?.id,
        customerName: customer?.full_name,
        customerAddress: customer?.main_address?.formatted_address,
        quoteDate: quote?.sent_to_customer_at,
      };

      getSignOffData(data?.data);
      setCustomerSignOffData(orderData);
      setQuoteApproval(data.data);
      setQuoteApprovalError(null);
      setApprovalPayMethodError(null);

      const {market_phone_number: phoneNumber} = data.data.quote;

      if (phoneNumber && phoneNumber !== layout.phoneNumber && setPDFHeaderPhoneAction) {
        setPDFHeaderPhoneAction(phoneNumber);
      }
    } catch (err) {
      const errorResponse = err as {response: ErrorResponse};
      const error = parseAPIError(errorResponse).nonFieldErrors.join('\n');
      setQuoteApproval(null);
      setQuoteApprovalError(error);
    } finally {
      setIsLoading(false);
    }
  }, [customerGID, match, setPDFHeaderPhoneAction, getQuoteApprovalDetails]);

  const reviewQuoteApproval = useCallback(async () => {
    try {
      if (quoteApproval && !some([isDirectPreview(match.path), isQuoteApprovalReviewed(quoteApproval.quote), asPDF])) {
        await reviewQuoteApprovalAPI(customerGID, match.params.secret);
      }
    } catch (apiError) {
      console.error(apiError);
    }
  }, [quoteApproval, reviewQuoteApprovalAPI, customerGID, match, isDirectPreview, isQuoteApprovalReviewed, asPDF]);

  const approveQuoteApproval = async (stripeToken: string) => {
    try {
      const data = await approveQuoteApprovalAPI(customerGID, match.params.secret, stripeToken);
      const updatedQuoteApproval = data.data;
      setApprovalPayMethod(updatedQuoteApproval['approval_paymethod']);
      setApprovalPayMethodError(null);
      setQuoteApproval(updatedQuoteApproval);
    } catch (err) {
      const errorResponse = err as {response: ErrorResponse};
      const error = parseAPIError(errorResponse).nonFieldErrors.join('\n');
      setApprovalPayMethod(null);
      setApprovalPayMethodError(error);
    }
  };

  const getSignOffData = (data: QuoteApproval) => {
    let newSignatureData: SignatureData | null = null;
    const {signoff_img, signoff_at, signoff_pdf} = data || {};
    if (signoff_at) {
      newSignatureData = {
        value: signoff_img,
        type: 'draw',
        signedDate: signoff_at,
        signedPDF: signoff_pdf,
      };
    }
    setSignatureData(newSignatureData);
    setIsCustomerSigned(!!signoff_pdf || !!signoff_at);
  };

  const onSubmitSignature = useCallback(
    async (value: string, type: string) => {
      setIsSignLoading(true);
      try {
        const newSignatureData = await getSignatureData(customerGID, match.params.secret, value, type);
        setSignatureData(newSignatureData);
        setIsCustomerSigned(true);
        const url = location.pathname.replace(/\/sign-off.*/i,'');
        history.push(url);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSignLoading(false);
      }
    },
    [customerGID, match, getSignatureData, history, location]
  );

  // Run effect on first render
  useEffect(() => {
    const onInit = async () => {
      await getQuoteApprovalDetailsFromAPI();
    };
    onInit();
  }, []);

  // Run effect on quoteApproval value change
  useEffect(() => {
    const onQuoteApproval = async () => {
      await reviewQuoteApproval();
    };
    onQuoteApproval();
  }, [quoteApproval]);

  if (isLoading) {
    return <AppLoader />;
  }

  if (!quoteApproval) {
    return quoteFallback || null;
  }

  if (quoteApprovalError || !isQuoteAddressValid(quoteApproval.quote)) {
    return <QuoteApprovalError quoteApprovalError={quoteApprovalError} />;
  }

  if (isSignOffPDF && asPDF && isCustomerSigned) {
    const signatureDataPDF = {
      ...signatureData,
      type: 'draw',
      value: getParameterByName('signoff_img', ''),
    } as SignatureData;

    return (
      <SignOffPdf
        asPDF={asPDF}
        customerSignOffData={customerSignOffData as OrderData}
        isCustomerSigned={isCustomerSigned}
        isSignLoading={isSignLoading}
        onSubmitSignature={onSubmitSignature}
        quoteApproval={quoteApproval}
        signatureData={signatureDataPDF}
      />
    );
  }

  return (
    <DefaultContent
      approvalPayMethod={approvalPayMethod}
      approvalPayMethodError={approvalPayMethodError}
      approveQuoteApproval={approveQuoteApproval}
      auth={auth}
      customerGID={customerGID}
      customerSignOffData={customerSignOffData as OrderData}
      isCustomerSigned={isCustomerSigned}
      isSignLoading={isSignLoading}
      match={match}
      onSubmitSignature={onSubmitSignature}
      quoteApproval={quoteApproval}
      signatureData={signatureData as SignatureData}
    />
  );
};

export default AppCustomerQuotePage;
