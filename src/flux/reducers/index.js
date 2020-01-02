import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import addressReducer from './address-reducer';
import cartReducer from './cart-reducer';
import authReducer from './auth';
import contactsReducer from './app-contacts';

const combinedReducers = combineReducers({
  auth: authReducer,
  address: addressReducer,
  routing: routerReducer,
  cart: cartReducer,
  contacts: contactsReducer,
});

export default combinedReducers;
