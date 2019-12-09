import {FENCE_SLUG} from 'website/constants';
import {actionTypes} from 'actions/address-actions';
import ls from 'local-storage';

let initialState = {
  address: null,
  lead: null,
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
    case actionTypes.ADDRESS_UPDATED:
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
    case actionTypes.CLEAR_ADDRESS:
      ls.remove('LS_ERGEON_LOCATION_DATA');
      return getStateFromLead(initialState);
  }

  return state;
}
