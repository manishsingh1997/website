import React from 'react';
import PropTypes from 'prop-types';

import {isPDFMode} from 'utils/utils';
import {parseAPIError} from 'utils/api';
import {formatPrice} from 'utils/app-order';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';

import {getQuoteDetails} from 'api/app';

import AppLoader from 'components/common/AppLoader';
import QuoteDetails from '../common/AppQuoteComponents/QuoteDetails';
import QuoteError from '../common/AppQuoteComponents/QuoteError';

import '@ergeon/draw-map/styles.css';

import '../common/AppQuoteComponents/index.scss';

export default class AppInstallerQuotePage extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
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
    const {quote: {replaced_by_quote: replacedByQuote}} = this.state;
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
    if (quote.parent_quote) {
      return this.getTotalPrice(quote.parent_quote);
    }
    return Number('0');
  }

  getProjectTotalPrice(quote) {
    return this.getTotalPreviouslyApprovedPrice(quote) + this.getTotalPrice(quote);
  }

  renderQuoteError() {
    return (
      <QuoteError quoteError={this.state.quoteError} />
    );
  }

  render() {
    const {
      isLoading,
      quote,
      quoteError,
    } = this.state;

    if (isLoading) {
      return <AppLoader />;
    }
    if (quoteError) {
      return this.renderQuoteError();
    }
    if (!quote) {
      return null;
    }

    const {customer} = quote.order.house;
    const quoteLines = quote['quote_lines'];
    const newQuoteLink = this.getNewQuoteLink();

    return (
      <div className="quote-detail-page">
        <QuoteDetails
          asPDF={isPDFMode()}
          auth={this.props.auth}
          customer={customer}
          customerGID={this.customerGID}
          isInstallerPreview={true}
          newQuoteLink={newQuoteLink}
          quote={quote}
          quoteLines={quoteLines}
          totalPreviouslyApprovedPrice={formatPrice(this.getTotalPreviouslyApprovedPrice(quote))}
          totalPrice={formatPrice(this.getTotalPrice(quote))}
          totalProjectPrice={formatPrice(this.getProjectTotalPrice(quote))} />
      </div>
    );
  }
}
