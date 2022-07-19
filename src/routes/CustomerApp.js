import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import {INSTALLER_PREVIEW_SLUG, DIRECT_PREVIEW_SLUG} from '../website/constants';

import AppLayout from '../containers/AppLayout';
import AppAppointmentsListPage from '../containers/AppAppointmentsListPage';
import AppContactsPage from '../containers/AppContactsPage';
import AppHouseListPage from '../containers/AppHouseListPage';
import AppOrderDetailPage from '../containers/AppOrderDetailPage';
import AppOrderListPage from '../containers/AppOrderListPage';
import AppCustomerQuotePage from '../containers/AppCustomerQuotePage';
import AppInstallerQuotePage from '../containers/AppInstallerQuotePage';
import AppQuoteDetailPage from '../containers/AppQuoteDetailPage';
import AppNotificationsPage from '../components/AppNotificationsPage';
import NotFoundPage from '../components/NotFoundPage';

const CustomerApp = ({match, location}) => (
  <AppLayout location={location} match={match}>
    <Switch>
      <Route component={AppAppointmentsListPage} path={`${match.url}/appointments`} />
      <Route component={AppContactsPage} path={`${match.url}/contacts`} />
      <Route component={AppHouseListPage} path={`${match.url}/addresses`} />
      <Route component={AppOrderDetailPage} path={`${match.url}/orders/:orderId`} />
      <Route component={AppOrderListPage} path={`${match.url}/orders`} />
      <Route component={AppQuoteDetailPage} exact name="quoteDetail" path={`${match.url}/quotes/:secret`} />
      <Route component={AppQuoteDetailPage} exact name="quoteDirect" path={`${match.url}/quotes/:type/:secret`} />
      <Route
        component={AppInstallerQuotePage}
        name="installerQuoteDetail"
        path={`${match.url}/quote-approvals/:secret/${INSTALLER_PREVIEW_SLUG}`}
      />
      <Route
        component={AppCustomerQuotePage}
        name="customerQuotePreview"
        path={`${match.url}/quote-approvals/:secret/${DIRECT_PREVIEW_SLUG}`}
      />
      <Route
        component={AppCustomerQuotePage}
        name="customerQuotePreview"
        path={`${match.url}/quote-approvals/:secret/${DIRECT_PREVIEW_SLUG}/sign-off`}
      />
      <Route
        component={AppCustomerQuotePage}
        name="customerQuoteDetail"
        path={`${match.url}/quote-approvals/:secret`}
      />
      <Route component={AppNotificationsPage} path={`${match.url}/notifications`} />
      <Route component={NotFoundPage} exact path="*" />
    </Switch>
  </AppLayout>
);

CustomerApp.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default CustomerApp;
