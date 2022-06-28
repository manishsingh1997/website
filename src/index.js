import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {initUTMs} from '@ergeon/erg-utms';
import omit from 'lodash/omit';

import {googleIntegration} from '@ergeon/core-components';
import {DRAW_MAP_GOOGLE_LIBRARIES} from '@ergeon/draw-map';
import {ERG_MAP_COMPONENT_LIBRARIES} from '@ergeon/map-component';
import {FencePhotoData, GatePhotoData} from 'data/photo-gallery';
import customScripts from 'website/custom-scripts';

import ErrorBoundary from 'components/ErrorBoundary';
import Layout from 'containers/Layout';
import MetaTags from 'components/common/MetaTags';
import NotFoundPage from 'components/NotFoundPage';
import CustomerApp from 'routes/CustomerApp';
import Cities from 'routes/Cities';
import publicRoutes from 'routes/public';

import {GeoTargetRoutingInterceptor} from './containers/RoutingInterceptor';
import {redirectRoutes} from './routes/redirects';
import store from './flux/store';
import '@ergeon/core-components/dist/main.css';
import './main.scss';

initUTMs('utm-iframe', process.env.WEBSITE_DOMAIN, [`${process.env.FENCEQUOTING_HOST}/utm/`]);

const {initGoogleLoader, ADDRESS_INPUT_LIBRARIES} = googleIntegration;
initGoogleLoader(
  process.env.GOOGLE_MAPS_API_KEY,
  ADDRESS_INPUT_LIBRARIES,
  ERG_MAP_COMPONENT_LIBRARIES,
  DRAW_MAP_GOOGLE_LIBRARIES
);

export const history = createBrowserHistory();

const renderPhotoGalleryRedirect = (productSlug, category) => {
  const groupSlug = category.categoryGroups ? category.categoryGroups[0].groupSlug : null;

  if (!groupSlug) return null;

  return (
    <Redirect
      exact
      from={`/gallery/${productSlug}/${category.categorySlug}`}
      key={`${productSlug}-${category.categorySlug}`}
      to={`/gallery/${productSlug}/${category.categorySlug}/${groupSlug}`}
    />
  );
};

render(
  <Provider store={store}>
    <Router history={history}>
      <MetaTags />
      <Switch>
        <Route
          exact
          path="/pro-advice"
          render={() => {
            window.location = process.env.BLOG_HOST;
          }}
        />
        <GeoTargetRoutingInterceptor>
          <Layout>
            <ErrorBoundary>
              <Switch>
                {FencePhotoData.map(renderPhotoGalleryRedirect.bind(this, 'fence'))}
                {GatePhotoData.map(renderPhotoGalleryRedirect.bind(this, 'gate'))}
                {publicRoutes.map((props) => (
                  <Route key={props.path} {...omit(props, 'sitemap')} />
                ))}
                {redirectRoutes.map((route) => (
                  <Route exact key={route.from} path={route.from}>
                    <Redirect to={{pathname: route.to, search: window.location.search, state: {status: 301}}} />
                  </Route>
                ))}
                <Route component={CustomerApp} path="/app/:customerGid" />
                <Route component={Cities} path="/fences/cities" />
                <Route component={NotFoundPage} exact path="*" />
                {/* Redirects to another domains and with different UTMs are defined at S3 bucket level (terraform) */}
              </Switch>
            </ErrorBoundary>
          </Layout>
        </GeoTargetRoutingInterceptor>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
  customScripts()
);
