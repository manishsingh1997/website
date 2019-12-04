import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {logger} from 'redux-logger';
import promise from 'redux-promise-middleware';

import combinedReducers from './reducers';

const middlewares = [];

middlewares.push(promise);
middlewares.push(routerMiddleware(history));

if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

const store = createStore(
  combinedReducers,
  applyMiddleware(...middlewares),
);

export default store;
