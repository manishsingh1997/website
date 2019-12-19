import ls from 'local-storage';

import {actionTypes} from 'actions/cart-actions';
import {LS_ERGEON_CART_DATA} from 'website/constants';

let initialState = {
  configs: ls.get(LS_ERGEON_CART_DATA) || [],
};

export default function addressReducer(state = initialState, action) {
  const {type, payload} = action;
  const configs = [...state.configs];

  switch (type) {
    case actionTypes.ADD_CONFIG:
      configs.push(payload);
      ls.set(LS_ERGEON_CART_DATA, configs);
      return {
        ...state,
        configs,
      };
    case actionTypes.UPDATE_CONFIG:
      configs[payload.index] = payload.config;
      ls.set(LS_ERGEON_CART_DATA, configs);
      return {
        ...state,
        configs,
      };
    case actionTypes.REMOVE_CONFIG:
      configs.splice(payload, 1);
      ls.set(LS_ERGEON_CART_DATA, configs);
      return {
        ...state,
        configs,
      };
  }

  return state;
}
