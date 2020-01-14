import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import addressReducer from './address-reducer';
import cartReducer from './cart-reducer';
import authReducer from './auth';
import contactsReducer from './app-contacts';
import ordersReducer from './app-orders';
import appointmentsReducer from './app-appointments';

const combinedReducers = combineReducers({
  auth: authReducer,
  address: addressReducer,
  routing: routerReducer,
  cart: cartReducer,
  contacts: contactsReducer,
  orders: ordersReducer,
  appointments: appointmentsReducer,
});

export default combinedReducers;
