import {actionTypes} from 'actions/conditional-features';
import config, {DEVELOPMENT} from 'website/config';

const initialAuthState = {
  isUpcomingFeaturesEnabled: config.env === DEVELOPMENT,
  isChristmasTime: false,
};

const conditionalFeaturesReducer = (state=initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_UPCOMING_FEATURES:
      return {...state, isUpcomingFeaturesEnabled: true};
    case actionTypes.SHOW_CHRISTMAS_FEATURES:
      return {...state, isChristmasTime: true};
    default:
      return state;
  }
};

export default conditionalFeaturesReducer;
