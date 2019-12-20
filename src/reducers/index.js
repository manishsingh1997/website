import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import addressReducer from 'reducers/address-reducer';
import cartReducer from 'reducers/cart-reducer';
import authReducer from 'reducers/auth';
import conditionalFeaturesReducer from 'reducers/conditional-features';

const combinedReducers = combineReducers({
  auth: authReducer,
  address: addressReducer,
  routing: routerReducer,
  cart: cartReducer,
  conditionalFeatures: conditionalFeaturesReducer,
});

export default combinedReducers;
