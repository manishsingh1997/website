import {actionTypes} from 'actions/conditional-features';
import config, {DEVELOPMENT} from 'website/config';

const initialAuthState = {
  isShowUpcomingFeatures: config.env === DEVELOPMENT,
  isShowChristmasFeatures: false,
};

const conditionalFeaturesReducer = (state=initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_UPCOMING_FEATURES:
      return {...state, isShowUpcomingFeatures: true};
    case actionTypes.SHOW_CHRISTMAS_FEATURES:
      return {...state, isShowChristmasFeatures: true};
    default:
      return state;
  }
};

export default conditionalFeaturesReducer;
