import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import addressReducer from 'reducers/address-reducer';
import cartReducer from 'reducers/cart-reducer';

const combinedReducers = combineReducers({
  address: addressReducer,
  routing: routerReducer,
  cart: cartReducer,
});

export default combinedReducers;
