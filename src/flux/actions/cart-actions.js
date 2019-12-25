
import {some, random} from 'lodash';
import {getPriceAndDescription} from 'api/lead';
import {constants, calcUtils} from '@ergeon/3d-lib';

export const actionTypes = {
  'ADD_CONFIG': 'ADD_CONFIG',
  'REMOVE_CONFIG': 'REMOVE_CONFIG',
  'UPDATE_CONFIG': 'UPDATE_CONFIG',
  'CLEAR_CONFIGS': 'CLEAR_CONFIGS',
};

export const actionTriggers = {
  addConfig: (config) => ({
    type: actionTypes.ADD_CONFIG,
    payload: config,
  }),
  removeConfig: (index) => ({
    type: actionTypes.REMOVE_CONFIG,
    payload: index,
  }),
  updateConfig: (index, config) => ({
    type: actionTypes.UPDATE_CONFIG,
    payload: {index, config},
  }),
  clearConfigs: (lead) => ({
    type: actionTypes.CLEAR_CONFIGS,
    payload: lead,
  }),
  // eslint-disable-next-line object-shorthand
  addConfigFromSchema: function({zipcode, data, schemaCode, length, configs}) {
    return dispatch => {
      const {TYPES, CATALOG_TYPE_FENCE, CATALOG_TYPE_GATE} = constants;

      if (some(configs, config => config.code == schemaCode)) return;

      return getPriceAndDescription(data, zipcode)
        .then(priceAndDescription => calcUtils.getPreviewImage(data)
          .then(preview => {
            const itemId = random(0, 1, true).toString(36).slice(2);
            const item = {
              id: itemId,
              'catalog_type': data[TYPES] ? CATALOG_TYPE_FENCE : CATALOG_TYPE_GATE,
              code: schemaCode,
              product: data,
              preview,
              description: priceAndDescription['description'],
              price: priceAndDescription['unit_price'],
              units: length || 1,
            };
            return dispatch(this.addConfig(item));
          })
        );
    };
  },
};