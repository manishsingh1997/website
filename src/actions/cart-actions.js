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
};