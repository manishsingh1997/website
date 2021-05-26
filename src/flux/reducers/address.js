import {FENCE_SLUG} from '@ergeon/core-components/src/constants';
import {localStorage as ls} from '@ergeon/erg-utils-js';
import {constants} from '@ergeon/3d-lib';
import {actionTypes} from '../actions/address';
import {get} from 'lodash';

let initialState = {
  address: null,
  lead: null,
  zipcode: constants.DEFAULT_ZIP,
  product: FENCE_SLUG,
  updateModalLead: null,
  updateModalOpened: false,
  updateModalValue: '',
  error: null,
};

const getStateFromLead = function(state, lead) {
  const product = (lead && lead['product_slug']) || state.product;
  return {
    ...state,
    address: lead ? lead.address['formatted_address'] : '',
    lead,
    zipcode: (lead && lead.productAvailability.products[product]) ? lead.address.zipcode : constants.DEFAULT_ZIP,
    product,
    updateModalLead: null,
    updateModalOpened: false,
    updateModalValue: get(lead, 'address.formatted_address', state.updateModalValue),
    error: null,
  };
};

if (ls.get('LS_ERGEON_LOCATION_DATA')) {
  initialState = getStateFromLead(initialState, ls.get('LS_ERGEON_LOCATION_DATA'));
}

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_UPDATED:
      return {
        ...state,
        product: action.payload,
      };
    case actionTypes.LEAD_UPDATED:
      ls.set('LS_ERGEON_LOCATION_DATA', action.payload);
      return getStateFromLead(state, action.payload);
    case actionTypes.MODAL_LEAD_UPDATED:
      return {
        ...state,
        updateModalLead: action.payload,
        updateModalValue: action.payload.address['formatted_address'] || '',
      };
    case actionTypes.OPEN_POPUP:
      return {
        ...state,
        updateModalLead: state.lead,
        updateModalOpened: true,
        updateModalValue: state.address || '',
      };
    case actionTypes.CLOSE_POPUP:
      return {
        ...state,
        updateModalLead: null,
        updateModalOpened: false,
        updateModalValue: state.address || '',
      };
    case actionTypes.MODAL_VALUE_UPDATED:
      return {
        ...state,
        updateModalLead: null,
        updateModalValue: action.payload || '',
      };
  }

  return state;
}
