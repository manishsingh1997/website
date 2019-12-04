export const actionTypes = {
  'ADDRESS_UPDATED': 'ADDRESS_UPDATED',
  'MODAL_LEAD_UPDATED': 'MODAL_LEAD_UPDATED',
  'OPEN_POPUP': 'OPEN_POPUP',
  'CLOSE_POPUP': 'CLOSE_POPUP',
  'CLEAR_ADDRESS': 'CLEAR_ADDRESS',
};

export const actionTriggers = {
  // TODO: something wrong here, 'updateAddress' accept 'lead', why no address?
  // Looks like some circular flow: address has lead, lead has address.
  // Better to clean it up.
  updateAddress: (lead) => ({
    type: actionTypes.ADDRESS_UPDATED,
    payload: lead,
  }),
  // TODO: is it really should be placed in redux store (popup state) ?
  // Why not just use component's state?
  // https://goshakkk.name/should-i-put-form-state-into-redux/
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
