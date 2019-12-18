import {actionTypes} from 'actions/upcoming-features';

const initialAuthState = {
  isShow: false,
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
