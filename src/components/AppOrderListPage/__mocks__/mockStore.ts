import {configureStore} from '@reduxjs/toolkit';

const mockConfigureStore = configureStore;
export const store = mockConfigureStore({reducer: {
    auth: () => null,
    address: () => null,
    routing: () => null,
    cart: () => null,
    contacts: () => null,
    orders: () => null,
    appointments: () => null,
    houses: () => null,
    layout: () => null
  }});
