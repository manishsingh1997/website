import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import {createHashHistory} from 'history';
import {Router, Route, Switch} from 'react-router-dom';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import promise from 'redux-promise-middleware';

import reducers from 'reducers/index';

import Layout from 'pages/layout';
import HomePage from 'pages/home-page';

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

render(
  <Provider store={store}>
    <Router history={history}>
      <Layout>
        <Switch>
          <Route component={HomePage} exact path="/"/>
        </Switch>
      </Layout>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
