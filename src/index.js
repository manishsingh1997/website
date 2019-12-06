import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import {
  FencePhotoData,
  GatePhotoData,
  DrivewayPhotoData,
} from 'data/photo-gallery';
import customScripts from 'libs/custom-scripts';

import Layout from 'containers/Layout';
import HomePage from 'components/HomePage';
import CareersPage from 'components/CareersPage';
import AboutPage from 'components/AboutPage';
import PhotoGallery from 'components/PhotoGallery';
import FAQPage from 'components/FAQPage';
import WarrantiesPage from 'components/WarrantiesPage';
import LocationsPage from 'components/LocationsPage';
import HelpPage from 'components/HelpPage';
import HelpLandingPage from 'components/HelpLandingPage';
import RequestQuotePage from 'containers/RequestQuotePage';
import store from 'store';

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
