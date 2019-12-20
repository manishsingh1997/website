import {isChristmasTime} from '@ergeon/core-components';

export const actionTypes = {
  'SHOW_UPCOMING_FEATURES': 'SHOW_UPCOMING_FEATURES',
  'SHOW_CHRISTMAS_FEATURES': 'SHOW_CHRISTMAS_FEATURES',
};

export const showUpcomingFeaturesIfRequested = function(parsedQuery) {
  return function(dispatch) {
    if ('upcoming-features' in parsedQuery) {
      dispatch({
        type: actionTypes.SHOW_UPCOMING_FEATURES,
      });
    }
  };
};

export const showChristmasFeaturesIfReady = function(date) {
  return function(dispatch) {
    if (isChristmasTime(date)) {
      dispatch({
        type: actionTypes.SHOW_CHRISTMAS_FEATURES,
      });
    }
  };
};
