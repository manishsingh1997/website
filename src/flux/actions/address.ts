import { Action, Dispatch } from 'redux';
import {constants} from '@ergeon/3d-lib';
import {getPlaceData, getCheckedZIP, getPriceAndDescription} from '../../api/lead';
import {Config, Lead, LeadAddress} from '../../components/RequestQuotePage/types';
import {updateConfig} from './cart';

export const actionTypes = {
  LEAD_UPDATED: 'LEAD_UPDATED',
  PRODUCT_UPDATED: 'PRODUCT_UPDATED',
  MODAL_LEAD_UPDATED: 'MODAL_LEAD_UPDATED',
  OPEN_POPUP: 'OPEN_POPUP',
  CLOSE_POPUP: 'CLOSE_POPUP',
  MODAL_VALUE_UPDATED: 'MODAL_VALUE_UPDATED',
};

export const updateProduct = (product: string) => ({
  type: actionTypes.PRODUCT_UPDATED,
  payload: product,
});

export const updateLead = function (lead: Lead) {
  return (dispatch: Dispatch<Action>, getState: () => { cart: { configs: Config[]; }; }) => {
    const {
      cart: {configs},
    } = getState();

    const configUpdates = Promise.all(
      configs.map((config, index) =>
        getPriceAndDescription(config.product, lead.zipcode).then(
          (priceAndDescription: {description: string; unit_price: string}) => {
            if (priceAndDescription) {
              return dispatch(
                updateConfig(index, {
                  ...config,
                  description: priceAndDescription['description'],
                  price: priceAndDescription['unit_price'],
                })
              );
            }
          }
        )
      )
    );

    return configUpdates.then(() =>
      dispatch({
        type: actionTypes.LEAD_UPDATED,
        payload: lead,
      })
    );
  };
};

// eslint-disable-next-line object-shorthand
export const updateLeadFromAddress = function ({address, product, zipcode}: LeadAddress) {
  const {DEFAULT_ZIP} = constants;

  return (dispatch: Dispatch<Action>) => {
    return getPlaceData(address)
      .then((placeData) =>
        getCheckedZIP(placeData.zipcode).then((checkedZipResponse) => {
          zipcode = checkedZipResponse.data.products[product] ? placeData.zipcode : DEFAULT_ZIP;
          dispatch(
            updateLead({
              address: placeData,
              product_slug: product,
              productAvailability: checkedZipResponse.data,
              zipcode,
            })
          );

          return zipcode;
        })
      )
      .catch((error: unknown) => {
        console.error('error trying to update lead', error);
        return DEFAULT_ZIP;
      });
  };
};

// TODO: is it really should be placed in redux store (popup state) ?
// Why not just use component's state?
// https://goshakkk.name/should-i-put-form-state-into-redux/
export const openAddressUpdatePopup = () => ({
  type: actionTypes.OPEN_POPUP,
  payload: null,
});

export const closeAddressUpdatePopup = () => ({
  type: actionTypes.CLOSE_POPUP,
  payload: null,
});

export const updateModalLead = (lead: Lead) => ({
  type: actionTypes.MODAL_LEAD_UPDATED,
  payload: lead,
});

export const updateModalValue = (value: string) => ({
  type: actionTypes.MODAL_VALUE_UPDATED,
  payload: value,
});
