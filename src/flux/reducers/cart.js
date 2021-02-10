import ls from 'local-storage';
import moment from 'moment';
import * as _ from 'lodash';
import {calcUtils} from '@ergeon/3d-lib';
import {LS_ERGEON_CART_DATA} from 'website/constants';
import {actionTypes} from '../actions/cart';

const getSavedCartData = () => {
  let cartData = ls.get(LS_ERGEON_CART_DATA) || [];
  let isRequiredUpdate = false;
  _.isArray(cartData) && cartData.forEach(item => {
    if (!item.timestamp && item.code && item.product) {
      isRequiredUpdate = true;
      item.product = calcUtils.getValueFromUrl(item.code, (error) => {
        console.warn(`It seems the config saved in cart is wrong or no longer supported. Config: ${item.code}`);
        console.warn(error);
        item.unsupported = true;
      });
      item.code = calcUtils.getSchemaCodeFromState(item.product);
      item.timestamp = moment().unix() * 1000;
    }
  });
  cartData = cartData.filter(item => !item.unsupported);
  if (isRequiredUpdate) {
    ls.set(LS_ERGEON_CART_DATA, cartData);
  }
  return cartData;
};

const initialState = {
  configs: getSavedCartData(),
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
