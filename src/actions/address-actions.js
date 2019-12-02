export const actionTypes = {
  'ADDRESS_UPDATED': 'ADDRESS_UPDATED',
  'MODAL_LEAD_UPDATED': 'MODAL_LEAD_UPDATED',
  'OPEN_POPUP': 'OPEN_POPUP',
  'CLOSE_POPUP': 'CLOSE_POPUP',
  'CLEAR_ADDRESS': 'CLEAR_ADDRESS',
};

export const actionTriggers = {
  updateAddress: (lead) => ({
    type: actionTypes.ADDRESS_UPDATED,
    payload: lead,
  }),
  openAddressUpdatePopup: () => ({
    type: actionTypes.OPEN_POPUP,
    payload: null,
  }),
  closeAddressUpdatePopup: () => ({
    type: actionTypes.CLOSE_POPUP,
    payload: null,
  }),
  updateModalLead: (lead) => ({
    type: actionTypes.MODAL_LEAD_UPDATED,
    payload: lead,
  }),
  logout: () => ({
    type: actionTypes.CLEAR_ADDRESS,
    payload: null,
  }),
};