import {constants} from '@ergeon/3d-lib';

import {getPlaceData, getCheckedZIP} from 'api/lead';

export const actionTypes = {
  'LEAD_UPDATED': 'LEAD_UPDATED',
  'MODAL_LEAD_UPDATED': 'MODAL_LEAD_UPDATED',
  'OPEN_POPUP': 'OPEN_POPUP',
  'CLOSE_POPUP': 'CLOSE_POPUP',
  'MODAL_VALUE_UPDATED': 'MODAL_VALUE_UPDATED',
};

export const actionTriggers = {
  updateLead: (lead) => ({
    type: actionTypes.LEAD_UPDATED,
    payload: lead,
  }),
  // eslint-disable-next-line object-shorthand
  updateLeadFromAddress: function({address, product, zipcode}) {
    const {DEFAULT_ZIP} = constants;

    return (dispatch) => {
      return getPlaceData(address)
        .then(
          placeData => getCheckedZIP(placeData.zipcode).then(
            checkedZipResponse => {
              zipcode = checkedZipResponse.data.supported ? placeData.zipcode : DEFAULT_ZIP;
              dispatch(this.updateLead({
                address: placeData,
                'product_slug': product,
                productAvailability: checkedZipResponse.data,
                zipcode,
              }));

              return zipcode;
            }
          )
        )
        .catch(error => {
          console.error('error trying to update lead', error);
          return zipcode;
        });
    };
  },
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
  updateModalValue: (value) => ({
    type: actionTypes.MODAL_VALUE_UPDATED,
    payload: value,
  }),
};
