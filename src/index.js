import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import {
  FencePhotoData,
  GatePhotoData,
  DrivewayPhotoData,
} from 'data/photo-gallery';
import customScripts from 'website/custom-scripts';

import AboutPage from 'components/AboutPage';
import AppLayout from 'containers/AppLayout';
import AppOrderListPage from 'containers/AppOrderListPage';
import AuthConfirmSignInPage from 'containers/AuthConfirmSignInPage';
import AuthLogoutPage from 'containers/AuthLogoutPage';
import AuthSignInPage from 'components/AuthSignInPage';
import CareersPage from 'components/CareersPage';
import ContactUsPage from 'components/ContactUsPage';
import FAQPage from 'components/FAQPage';
import HelpLandingPage from 'components/HelpLandingPage';
import HelpPage from 'components/HelpPage';
import HomePage from 'components/HomePage';
import Layout from 'containers/Layout';
import LocationsPage from 'components/LocationsPage';
import PhotoGallery from 'components/PhotoGallery';
import RequestQuotePage from 'containers/RequestQuotePage';
import WarrantiesPage from 'components/WarrantiesPage';
import store from 'flux/store';

import '@ergeon/core-components/src/components/main.scss';
import './main.scss';

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

const CustomerApp = ({match}) => (
  <AppLayout match={match}>
    <Route component={AppOrderListPage} path={`${match.url}/orders`} />
  </AppLayout>
);

render(
  <Provider store={store}>
    <Router history={history}>
      <Layout>
        <Switch>
          {FencePhotoData.map(renderPhotoGalleryRedirect.bind(this, 'fence'))}
          {GatePhotoData.map(renderPhotoGalleryRedirect.bind(this, 'gate'))}
          {DrivewayPhotoData.map(renderPhotoGalleryRedirect.bind(this, 'driveway'))}

          <Route component={HomePage} exact path="/"/>
          <Route component={CareersPage} exact path="/careers"/>
          <Route component={ContactUsPage} exact path="/contacts"/>
          <Route component={AboutPage} exact path="/about-ergeon"/>
          <Route component={PhotoGallery} exact path="/gallery/"/>
          <Route component={PhotoGallery} exact path="/gallery/:productSlug/:categorySlug"/>
          <Route component={PhotoGallery} exact path="/gallery/:productSlug/:categorySlug/:groupSlug"/>
          <Route component={FAQPage} exact path="/faq"/>
          <Route component={WarrantiesPage} exact path="/licenses-warranties"/>
          <Route component={LocationsPage} exact path="/locations"/>
          <Route component={HelpLandingPage} exact path="/help"/>
          <Route component={HelpPage} exact path="/help/search"/>
          <Route component={HelpPage} exact path="/help/:nodeId"/>
          <Route component={RequestQuotePage} exact path="/request-quote"/>
          <Route component={AuthSignInPage} exact path="/app/sign-in"/>
          <Route component={AuthConfirmSignInPage} exact path="/app/confirm-sign-in"/>
          <Route component={AuthLogoutPage} exact path="/app/logout"/>
          <Route component={CustomerApp} path="/app/:customerGid" />
          <Redirect
            exact
            from="/gallery/driveway"
            key="gallery-driveway-redirect"
            to="/gallery/driveway/stamped/casual" />
          {/* Redirects to another domains and with different UTMs are defined at S3 bucket level (terraform) */}
        </Switch>
      </Layout>
    </Router>
  </Provider>,
  document.getElementById('root'),
  customScripts(),
);

CustomerApp.propTypes = {
  match: PropTypes.object,
};
