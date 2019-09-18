import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import {createHashHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import promise from 'redux-promise-middleware';

import reducers from 'reducers/index';
import {
  FencePhotoData,
  GatePhotoData,
  DrivewayPhotoData,
} from 'data/photo-gallery';

import Layout from 'pages/layout';
import HomePage from 'pages/home-page';
import CareersPage from './pages/careers-page';
import AboutPage from 'pages/about-page';
import PhotoGallery from 'pages/photo-gallery';
import FAQPage from 'pages/faq-page';

import '@ergeon/core-components/src/components/main.scss';
import './components/main.scss';

const history = createHashHistory();
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
        </Switch>
      </Layout>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
