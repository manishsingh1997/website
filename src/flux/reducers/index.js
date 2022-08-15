import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import addressReducer from './address';
import cartReducer from './cart';
import authReducer from './auth';
import contactsReducer from './app-contacts';
import ordersReducer from './app-orders';
import appointmentsReducer from './app-appointments';
import housesReducer from './app-houses';
import selectedHouseReducer from './app-selected-house';
import layoutReducer from './layout';
import cityReducer from './city';

const combinedReducers = combineReducers({
  auth: authReducer,
  address: addressReducer,
  routing: routerReducer,
  cart: cartReducer,
  contacts: contactsReducer,
  orders: ordersReducer,
  appointments: appointmentsReducer,
  houses: housesReducer,
  selectedHouse: selectedHouseReducer,
  layout: layoutReducer,
  city: cityReducer,
});

export default combinedReducers;
