import React, {useContext, useMemo, useCallback} from 'react';

import {Route, useHistory, useLocation} from 'react-router-dom';
import '@ergeon/draw-map/styles.css';

import {isPDFMode} from '../../utils/utils';
import {formatPrice, isQuoteAddressValid} from '../../utils/app-order';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import AppLoader from '../../components/common/AppLoader';
import BuildSpecs from '../../components/common/AppQuoteComponents/BuildSpecs';
import {AuthState} from '../../flux/reducers/auth';
import QuoteDetails from '../common/AppQuoteComponents/QuoteDetails';
import QuoteError from '../common/AppQuoteComponents/QuoteError';
import {prepareQuoteLines} from '../common/AppQuoteComponents/utils';
import useQuoteDetails from '../AppQuoteDetailPage/useQuoteDetails';

import '../common/AppQuoteComponents/index.scss';

type AppInstallerQuotePage = {
  auth: AuthState;
  match: {
    path: string;
    params: {
      secret: string;
    };
  };
};

const AppInstallerQuotePage = (props: AppInstallerQuotePage) => {
  const {match, auth} = props;

  const history = useHistory();
  const location = useLocation();

  const customerGID = useContext(CustomerGIDContext);

  const {isLoading, quote, quoteError} = useQuoteDetails(customerGID, match.params.secret);

  const getNewQuoteLink = useCallback(() => {
    if (!quote) return null;

    const {replaced_by_quote: replacedByQuote} = quote;
    if (!replacedByQuote) {
      return null;
    }
    return location.pathname.replace(match.params?.secret, replacedByQuote.secret);
  }, [location.pathname, quote, match.params?.secret]);

  const totalPrice = useMemo(() => {
    if (quote) {
      return formatPrice(Number.parseFloat(quote['total_cost']));
    }
    return '';
  }, [quote?.['total_cost']]);

  const totalPreviouslyApprovedPrice = useMemo(() => {
    if (quote) {
      return formatPrice(Number.parseFloat(quote['previously_approved_total_cost']));
    }
  }, [quote?.['previously_approved_total_cost']]);

  const projectTotalPrice = useMemo(() => {
    if (quote) {
      return formatPrice(Number.parseFloat(quote['project_total_cost']));
    }
    return '';
  }, [quote?.['project_total_cost']]);

  const quoteLines = useMemo(() => {
    if (quote) {
      return prepareQuoteLines(quote['quote_lines'], quote);
    }
    return '';
  }, [quote]);

  const isAddressValid = useMemo(() => {
    if (quote) {
      return isQuoteAddressValid(quote);
    }
  }, [quote]);

  const newQuoteLink = useMemo(() => {
    if (quote) {
      return getNewQuoteLink();
    }
    return '';
  }, [quote, getNewQuoteLink]);

  const isPDFModeEnabled = useMemo(() => {
    return isPDFMode();
  }, []);

  const onBuildDetailsClick = useCallback(
    (configID, label) => {
      history.push(`${location.pathname.replace(/\/$/, '')}/config/${configID}`, {label});
    },
    [history, location.pathname]
  );

  if (isLoading) {
    return <AppLoader />;
  }
  if (quoteError) {
    return <QuoteError quoteError={quoteError} />;
  }
  if (!quote) {
    return null;
  }

  if (!isAddressValid) {
    return (
      <QuoteError
        description={
          'The quote is missing an address and cannot be displayed. Please message your Ergeon representative.'
        }
        title="Quote Inconsistency"
      />
    );
  }

  return (
    <>
      <Route exact path={`${match.path}/config/:configID`}>
        <BuildSpecs />
      </Route>
      <div className="quote-detail-page">
        <QuoteDetails
          asPDF={isPDFModeEnabled}
          auth={auth}
          customer={quote.order.house?.customer}
          customerGID={customerGID}
          isInstallerPreview={true}
          newQuoteLink={newQuoteLink}
          onBuildDetailsClick={onBuildDetailsClick}
          quote={quote}
          quoteLines={quoteLines}
          totalPreviouslyApprovedPrice={totalPreviouslyApprovedPrice}
          totalPrice={totalPrice}
          totalProjectPrice={projectTotalPrice}
        />
      </div>
    </>
  );
};

export default AppInstallerQuotePage;
