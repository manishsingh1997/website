import {Action, Dispatch} from 'redux';

import some from 'lodash/some';
import random from 'lodash/random';
import {calcUtils, CatalogType} from '@ergeon/3d-lib';
import moment from 'moment';

import {getPriceAndDescription} from '../../api/lead';
import {Config, Lead, LeadConfigType} from '../../components/RequestQuotePage/types';

const {getCatalogType} = calcUtils;

export const actionTypes = {
  ADD_CONFIG: 'ADD_CONFIG',
  REMOVE_CONFIG: 'REMOVE_CONFIG',
  UPDATE_CONFIG: 'UPDATE_CONFIG',
  CLEAR_CONFIGS: 'CLEAR_CONFIGS',
};

export const addConfig = (config: Config) => ({
  type: actionTypes.ADD_CONFIG,
  payload: config,
});

export const removeConfig = (index: number) => ({
  type: actionTypes.REMOVE_CONFIG,
  payload: index,
});

export const updateConfig = (index: number, config: Config) => ({
  type: actionTypes.UPDATE_CONFIG,
  payload: {index, config},
});

export const clearConfigs = (lead: Lead) => ({
  type: actionTypes.CLEAR_CONFIGS,
  payload: lead,
});

// eslint-disable-next-line object-shorthand
export const addConfigFromSchema = function (
  {zipcode, data, schemaCode, length, grade, configs}: LeadConfigType,
  index = -1
) {
  return (dispatch: Dispatch<Action>) => {
    if (some(configs, (config) => config.code === schemaCode)) return;
    const itemId = random(0, 1, true).toString(36).slice(2);

    const item: Config = {
      id: itemId,
      catalog_type:  data ? getCatalogType(data): CatalogType.FENCE,
      code: schemaCode,
      product: data,
      preview: '',
      description: '',
      price: '',
      units: length || 1,
      grade: grade || 0,
      timestamp: moment().unix() * 1000,
    };

    return getPriceAndDescription(data, zipcode)
      .then((priceAndDescription) => {
        if (priceAndDescription) {
          item.description = priceAndDescription['description'];
          item.price = priceAndDescription['unit_price'];
          item.timestamp = moment().unix() * 1000;

          if (index !== -1) {
            return dispatch(updateConfig(index, item));
          }

          return dispatch(addConfig(item));
        }
      })
      .then(() => calcUtils.getPreviewImage({schemaCodeUrl: schemaCode}))
      .then((preview) => {
        dispatch(
          updateConfig(index !== -1 ? index : configs.length, {
            ...item,
            preview,
          })
        );
      });
  };
};
