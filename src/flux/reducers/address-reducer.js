import {FENCE_SLUG} from 'website/constants';
import ls from 'local-storage';
import {constants} from '@ergeon/3d-lib';
import {actionTypes} from '../actions/address-actions';

let initialState = {
  address: null,
  lead: null,
  zipcode: constants.DEFAULT_ZIP,
  product: FENCE_SLUG,
  updateModalLead: null,
  updateModalOpened: false,
  error: null,
};

const getStateFromLead = function(state, lead) {
  return {
    ...state,
    address: lead ? lead.address['formatted_address'] : '',
    lead,
    zipcode: lead.zipcode || state.zipcode,
    product: (lead && lead['product_slug']) || state.product,
    updateModalLead: null,
    updateModalOpened: false,
    error: null,
  };
};

if (ls.get('LS_ERGEON_LOCATION_DATA')) {
  initialState = getStateFromLead(initialState, ls.get('LS_ERGEON_LOCATION_DATA'));
}

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LEAD_UPDATED:
      ls.set('LS_ERGEON_LOCATION_DATA', action.payload);
      return getStateFromLead(state, action.payload);
    case actionTypes.MODAL_LEAD_UPDATED:
      return {
        ...state,
        updateModalLead: action.payload,
      };
    case actionTypes.OPEN_POPUP:
      return {
        ...state,
        updateModalLead: null,
        updateModalOpened: true,
      };
    case actionTypes.CLOSE_POPUP:
      return {
        ...state,
        updateModalLead: null,
        updateModalOpened: false,
      };
  }

  return state;
}
