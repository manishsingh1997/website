import {actionTypes} from 'actions/upcoming-features';
import config, {DEVELOPMENT} from 'website/config';

const initialAuthState = {
  isShow: config.env === DEVELOPMENT,
};

const upcomingFeaturesReducer = (state=initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_UPCOMING_FEATURES:
      return {...state, isShow: true};
    default:
      return state;
  }
};

export default upcomingFeaturesReducer;
