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
    const January = 0;
    const December = 11;
    if (date.getMonth() == December && date.getDate() >= 23 || date.getMonth() == January && date.getDate() <= 1) {
      dispatch({
        type: actionTypes.SHOW_CHRISTMAS_FEATURES,
      });
    }
  };
};
