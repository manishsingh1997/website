import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import promise from 'redux-promise-middleware';

import reducers from 'reducers/index';
import {
  FencePhotoData,
  GatePhotoData,
  DrivewayPhotoData,
} from 'data/photo-gallery';
import customScripts from 'libs/custom-scripts';

import Layout from 'pages/layout';
import HomePage from 'pages/home-page';
import CareersPage from 'pages/careers-page';
import AboutPage from 'pages/about-page';
import PhotoGallery from 'pages/photo-gallery';
import FAQPage from 'pages/faq-page';
import WarrantiesPage from 'pages/warranties-page';
import LocationsPage from 'pages/locations-page';

import '@ergeon/core-components/src/components/main.scss';
import './components/main.scss';

const history = createBrowserHistory();
const middlewares = [];

middlewares.push(promise);
middlewares.push(routerMiddleware(history));

if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  applyMiddleware(...middlewares),
);

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
          <Redirect
            exact
            from="/gallery/driveway"
            key="gallery-driveway-redirect"
            to="/gallery/driveway/stamped/casual" />
          <Redirect
            exact
            from="/dec50"
            key="dec50-direct-mail-redirect"
            to="/?utm_content=fence&utm_source=direct_mail&utm_campaign=2018_12_06Blast" />
          <Redirect
            exact
            from="/50off"
            key="50off-direct-mail-redirect"
            to="/?utm_content=fence&utm_source=direct_mail&utm_campaign=2018_12_12LLHolidayPC" />
          <Redirect
            exact
            from="/DWY100"
            key="DWY100-direct-mail-redirect"
            to="/?utm_content=driveway&utm_source=direct_mail&utm_campaign=2019_02_05CMPLeadCustomBP" />
          <Redirect
            exact
            from="/fence50"
            key="fence50-direct-mail-redirect"
            to="/?utm_source=direct-mail&utm_campaign=fence" />
          {/* Redirects to another domains are defined at S3 bucket level (terraform) */}
        </Switch>
      </Layout>
    </Router>
  </Provider>,
  document.getElementById('root'),
  customScripts(),
);
