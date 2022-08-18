import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

import {isPDFMode} from '../../utils/utils';
import {parseAPIError} from '../../utils/api.ts';
import {formatPrice, isQuoteAddressValid} from '../../utils/app-order';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';

import {getQuoteDetails} from '../../api/app';

import AppLoader from '../../components/common/AppLoader';
import BuildSpecs from '../../components/common/AppQuoteComponents/BuildSpecs';
import QuoteDetails from '../common/AppQuoteComponents/QuoteDetails';
import QuoteError from '../common/AppQuoteComponents/QuoteError';
import {prepareQuoteLines} from '../common/AppQuoteComponents/utils';
import '@ergeon/draw-map/styles.css';

import '../common/AppQuoteComponents/index.scss';

export default class AppInstallerQuotePage extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      path: PropTypes.string,
      params: PropTypes.shape({
        secret: PropTypes.string,
      }),
    }),
  };

  state = {
    isLoading: true,
    quote: null,
    quoteError: null,
  };

  async componentDidMount() {
    await this.getQuoteDetailsFromAPI();
  }

  static contextType = CustomerGIDContext;

  get customerGID() {
    return this.context;
  }

  getNewQuoteLink() {
    const {location, match} = this.props;
    const {
      quote: {replaced_by_quote: replacedByQuote},
    } = this.state;
    if (!replacedByQuote) {
      return null;
    }
    return location.pathname.replace(match.params.secret, replacedByQuote.secret);
  }

  async getQuoteDetailsFromAPI() {
    // We don't need this data in redux store for now, so calling API directly

    try {
      const data = await getQuoteDetails(this.customerGID, this.props.match.params.secret);
      this.setState({
        quote: data.data,
        quoteError: null,
        paymentMethodError: null,
      });
    } catch (apiError) {
      this.setState({
        quote: null,
        quoteError: parseAPIError(apiError),
      });
    } finally {
      this.setState({isLoading: false});
    }
  }

  getTotalPrice(quote) {
    return Number.parseFloat(quote['total_cost']);
  }

  getTotalPreviouslyApprovedPrice(quote) {
    return Number.parseFloat(quote['previously_approved_total_cost']);
  }

  getProjectTotalPrice(quote) {
    return Number.parseFloat(quote['project_total_cost']);
  }

  onBuildDetailsClick(configID, label) {
    const {history, location} = this.props;
    history.push(`${location.pathname.replace(/\/$/, '')}/config/${configID}`, {label});
  }

  renderQuoteError() {
    return <QuoteError quoteError={this.state.quoteError} />;
  }

  render() {
    const {match} = this.props;
    const {isLoading, quote, quoteError} = this.state;

    if (isLoading) {
      return <AppLoader />;
    }
    if (quoteError) {
      return this.renderQuoteError();
    }
    if (!quote) {
      return null;
    }
    if (!isQuoteAddressValid(quote)) {
      return (
        <QuoteError
          description={
            'The quote is missing an address and cannot be displayed. Please message your Ergeon representative.'
          }
          title="Quote Inconsistency"
        />
      );
    }

    const {customer} = quote.order.house;
    const quoteLines = prepareQuoteLines(quote['quote_lines'], quote);
    const newQuoteLink = this.getNewQuoteLink();

    return (
      <>
        <Route exact path={`${match.path}/config/:configID`}>
          <BuildSpecs />
        </Route>
        <div className="quote-detail-page">
          <QuoteDetails
            asPDF={isPDFMode()}
            auth={this.props.auth}
            customer={customer}
            customerGID={this.customerGID}
            isInstallerPreview={true}
            newQuoteLink={newQuoteLink}
            onBuildDetailsClick={this.onBuildDetailsClick.bind(this)}
            quote={quote}
            quoteLines={quoteLines}
            totalPreviouslyApprovedPrice={formatPrice(this.getTotalPreviouslyApprovedPrice(quote))}
            totalPrice={formatPrice(this.getTotalPrice(quote))}
            totalProjectPrice={formatPrice(this.getProjectTotalPrice(quote))}
          />
        </div>
      </>
    );
  }
}
