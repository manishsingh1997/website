// This is the deprecated quote preview page. You can find a new quote preview pages in
// src/components/AppCustomerQuotePage - quote preview for customers
// src/components/AppInstallerQuotePage - quote preview for installers

import PropTypes from 'prop-types';
import React from 'react';
import {Redirect} from 'react-router-dom';

import {getQuoteDetails} from 'api/app';
import AppLoader from 'components/common/AppLoader';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import {parseAPIError} from 'utils/api.ts';
import {
  DIRECT_PREVIEW_SLUG,
  HTTP_STATUS_NOT_FOUND,
  INSTALLER_PREVIEW_SLUG,
  NOT_FOUND_PAGE_PATH,
} from 'website/constants';

export default class AppQuoteDetailPage extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string,
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

  async getQuoteDetailsFromAPI() {
    // We don't need this data in redux store for now, so calling API directly

    try {
      const data = await getQuoteDetails(this.customerGID, this.props.match.params.secret);
      this.setState({
        quote: data.data,
        quoteError: null,
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

  isInstallerPreview() {
    return this.props.match.params.type === INSTALLER_PREVIEW_SLUG;
  }

  isDirectPreview() {
    return this.props.match.params.type === DIRECT_PREVIEW_SLUG;
  }

  render() {
    if (this.state.isLoading) {
      return <AppLoader />;
    }

    if (!this.state.quote && this.state.quoteError && this.state.quoteError.statusCode === HTTP_STATUS_NOT_FOUND) {
      return <Redirect to={NOT_FOUND_PAGE_PATH} />;
    }

    const {
      quote: {quote_approvals: quoteApprovals, secret: quoteSecret},
    } = this.state;
    const {
      customer: {gid: customerSecret},
      secret: quoteApprovalSecret,
    } = quoteApprovals[0];

    let searchString = '';
    if (window.location && window.location.search) {
      searchString = window.location.search;
    }

    if (this.isInstallerPreview()) {
      return (
        <Redirect
          to={`/app/${customerSecret}/quote-approvals/${quoteSecret}/${INSTALLER_PREVIEW_SLUG}/${searchString}`}
        />
      );
    }

    if (this.isDirectPreview()) {
      return (
        <Redirect
          to={`/app/${customerSecret}/quote-approvals/${quoteApprovalSecret}/${DIRECT_PREVIEW_SLUG}/${searchString}`}
        />
      );
    }

    return <Redirect to={`/app/${customerSecret}/quote-approvals/${quoteApprovalSecret}/${searchString}`} />;
  }
}
