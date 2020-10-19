import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {initUTMs} from '@ergeon/erg-utms';
import omit from 'lodash/omit';

import {
  FencePhotoData,
  GatePhotoData,
  DrivewayPhotoData,
} from 'data/photo-gallery';
import customScripts from 'website/custom-scripts';

import AppAppointmentsListPage from 'containers/AppAppointmentsListPage';
import AppContactsPage from 'containers/AppContactsPage';
import AppHouseListPage from 'containers/AppHouseListPage';
import AppLayout from 'containers/AppLayout';
import AppOrderDetailPage from 'containers/AppOrderDetailPage';
import AppOrderListPage from 'containers/AppOrderListPage';
import AppQuoteDetailPage from 'containers/AppQuoteDetailPage';
import AppNotificationsPage from 'components/AppNotificationsPage';
import ErrorBoundary from 'components/ErrorBoundary';
import Layout from 'containers/Layout';
import NotFoundPage from 'components/NotFoundPage';
import MetaTags from 'components/common/MetaTags';

import store from 'flux/store';
import config from 'website/config';
import publicRoutes from 'routes/public';

import '@ergeon/core-components/src/components/main.scss';
import './main.scss';

initUTMs('utm-iframe', config.websiteDomain, [
  `${config.fencequotingHost}/utm/`,
]);

export const history = createBrowserHistory();

const renderPhotoGalleryRedirect = (productSlug, category) => {
  const groupSlug = category.categoryGroups ? category.categoryGroups[0].groupSlug : null;

  if (!groupSlug) return null;

  return (
    <Redirect
      exact
      from={`/gallery/${productSlug}/${category.categorySlug}`}
      key={`${productSlug}-${category.categorySlug}`}
      to={`/gallery/${productSlug}/${category.categorySlug}/${groupSlug}`} />
  );
};

const CustomerApp = ({match, location}) => (
  <AppLayout location={location} match={match}>
    <Switch>
      <Route component={AppAppointmentsListPage} path={`${match.url}/appointments`} />
      <Route component={AppContactsPage} path={`${match.url}/contacts`} />
      <Route component={AppHouseListPage} path={`${match.url}/houses`} />
      <Route component={AppOrderDetailPage} path={`${match.url}/orders/:orderId`} />
      <Route component={AppOrderListPage} path={`${match.url}/orders`} />
      <Route component={AppQuoteDetailPage} exact name="quoteDetail" path={`${match.url}/quotes/:secret`} />
      <Route component={AppQuoteDetailPage} exact name="quoteDirect" path={`${match.url}/quotes/:type/:secret`} />
      <Route component={AppQuoteDetailPage} exact name="quoteVendor" path={`${match.url}/quotes/:type/:secret`} />
      <Route component={AppNotificationsPage} path={`${match.url}/notifications`} />
      <Route component={NotFoundPage} exact path="*"/>
    </Switch>
  </AppLayout>
);

render(
  <Provider store={store}>
    <Router history={history}>
      <MetaTags>
        <Switch>
          <Route
            exact
            path="/pro-advice"
            render={() => {
              window.location = config.blogHost;
            }} />
          <Layout>
            <ErrorBoundary>
              <Switch>
                {FencePhotoData.map(renderPhotoGalleryRedirect.bind(this, 'fence'))}
                {GatePhotoData.map(renderPhotoGalleryRedirect.bind(this, 'gate'))}
                {DrivewayPhotoData.map(renderPhotoGalleryRedirect.bind(this, 'driveway'))}
                {publicRoutes.map(props => <Route key={props.path} {...omit(props, 'sitemap')} />)}
                <Route component={CustomerApp} path="/app/:customerGid" />
                <Redirect
                  exact
                  from="/gallery/driveway"
                  key="gallery-driveway-redirect"
                  to="/gallery/driveway/stamped/casual" />
                <Route component={NotFoundPage} exact path="*"/>
                {/* Redirects to another domains and with different UTMs are defined at S3 bucket level (terraform) */}
              </Switch>
            </ErrorBoundary>
          </Layout>
        </Switch>
      </MetaTags>
    </Router>
  </Provider>,
  document.getElementById('root'),
  customScripts(),
);

CustomerApp.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};
