import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import addressReducer from './address-reducer';

const combinedReducers = combineReducers({
  address: addressReducer,
  routing: routerReducer,
});

export default combinedReducers;
