import {AnyAction} from 'redux';
import thunk, {ThunkAction, ThunkMiddleware} from 'redux-thunk';

import {configureStore} from '@reduxjs/toolkit';
import {createMemoryHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
import {logger} from 'redux-logger';

import combinedReducers from './reducers';

declare module 'redux' {
  interface Dispatch<A extends Action = AnyAction> {
    <S, E, R>(asyncAction: ThunkAction<R, S, E, A>): R;
  }
}
type ReduxState = ReturnType<typeof combinedReducers>;
export type Action<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, AnyAction>;

const history = createMemoryHistory();
const middlewares = [thunk as ThunkMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

const store = configureStore({reducer: combinedReducers, middleware: middlewares});

export default store;
