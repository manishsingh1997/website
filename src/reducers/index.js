import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import addressReducer from 'reducers/address-reducer';
import cartReducer from 'reducers/cart-reducer';
import authReducer from 'reducers/auth';
import upcomingFeaturesReducer from 'reducers/upcoming-features';

const combinedReducers = combineReducers({
  auth: authReducer,
  address: addressReducer,
  routing: routerReducer,
  cart: cartReducer,
  upcomingFeatures: upcomingFeaturesReducer,
});

export default combinedReducers;
