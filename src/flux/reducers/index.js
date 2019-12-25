import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import addressReducer from './address-reducer';
import cartReducer from './cart-reducer';
import authReducer from './auth';

const combinedReducers = combineReducers({
  auth: authReducer,
  address: addressReducer,
  routing: routerReducer,
  cart: cartReducer,
});

export default combinedReducers;
