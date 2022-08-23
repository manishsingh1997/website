// This is the deprecated quote preview page. You can find a new quote preview pages in
// src/components/AppCustomerQuotePage - quote preview for customers
// src/components/AppInstallerQuotePage - quote preview for installers

import React, {useMemo, useContext} from 'react';

import {Redirect} from 'react-router-dom';

import AppLoader from '../common/AppLoader';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import {
  DIRECT_PREVIEW_SLUG,
  HTTP_STATUS_NOT_FOUND,
  INSTALLER_PREVIEW_SLUG,
  NOT_FOUND_PAGE_PATH,
} from '../../website/constants';

import useQuoteDetails from './useQuoteDetails';

export type AppQuoteDetailPageProps = {
  match: {
    params: {
      type: string;
      secret: string;
    };
  };
};

const AppQuoteDetailPage = (props: AppQuoteDetailPageProps) => {
  const {match} = props;

  const customerGID = useContext(CustomerGIDContext);

  const {isLoading, quote, quoteError} = useQuoteDetails(customerGID, match.params.secret);

  const isInstallerPreview = useMemo(() => {
    return match.params.type === INSTALLER_PREVIEW_SLUG;
  }, [match.params.type]);

  const isDirectPreview = useMemo(() => {
    return match.params.type === DIRECT_PREVIEW_SLUG;
  }, [match.params.type]);

  const searchString = useMemo(() => {
    if (window.location?.search) {
      return window.location.search;
    }
    return '';
  }, [window.location?.search]);

  const isPageNotFound = useMemo(() => {
    return !quote && quoteError && Number(quoteError.statusCode) === HTTP_STATUS_NOT_FOUND;
  }, [quote, quoteError]);

  const {quoteSecret, quoteApprovalSecret, customerSecret} = useMemo(() => {
    const {quote_approvals: quoteApprovals, secret: quoteSecret} = quote ?? {};
    const {customer, secret: quoteApprovalSecret} = quoteApprovals?.[0] ?? {};
    const {gid: customerSecret} = customer ?? {};

    return {quoteSecret, quoteApprovalSecret, customerSecret};
  }, [quote]);

  if (isLoading) {
    return <AppLoader />;
  }

  if (isPageNotFound) {
    return <Redirect to={NOT_FOUND_PAGE_PATH} />;
  }

  if (isInstallerPreview) {
    return (
      <Redirect
        to={`/app/${customerSecret}/quote-approvals/${quoteSecret}/${INSTALLER_PREVIEW_SLUG}/${searchString}`}
      />
    );
  }

  if (isDirectPreview) {
    return (
      <Redirect
        to={`/app/${customerSecret}/quote-approvals/${quoteApprovalSecret}/${DIRECT_PREVIEW_SLUG}/${searchString}`}
      />
    );
  }

  return <Redirect to={`/app/${customerSecret}/quote-approvals/${quoteApprovalSecret}/${searchString}`} />;
};

export default AppQuoteDetailPage;
