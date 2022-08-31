import {Dispatch} from 'react';

import {Action, ActionType} from '../appNotificationPageReducer';
import {getNotificationPreferenceFromResponse} from '../utils';
import {getNotificationPreferences} from '../../../api/app';
import {getUnsubscribeCodeFromQuery} from '../../../utils/app-notifications';
import {parseAPIError} from '../../../utils/api';
import {ParsedAPIErrorType} from '../../../utils/types';

export const getNotificationPreference = async (customerGID: string, location: Location) => {
  const unsubscribeCode = getUnsubscribeCodeFromQuery(location.search);
  const response = await getNotificationPreferences(customerGID, unsubscribeCode);
  return getNotificationPreferenceFromResponse(response) || null;
};

// We don't need this data in redux store for now, so calling API directly
const updateNotificationPreferencesOnLocal =
  async (customerGID: string, dispatch: Dispatch<Action>, location: Location) => {
    try {
      // we support primary contact only for now
      const data = await getNotificationPreference(customerGID, location);
      dispatch({type: ActionType.UPDATE_NOTIFICATION_PREFERENCE, notificationPreference: data});
      dispatch({type: ActionType.UPDATE_INITIAL_ERROR, initialError: null});
    } catch (apiError) {
      dispatch({type: ActionType.UPDATE_NOTIFICATION_PREFERENCE, notificationPreference: null});
      dispatch({type: ActionType.UPDATE_INITIAL_ERROR, initialError: parseAPIError(apiError as ParsedAPIErrorType)});
    } finally {
      dispatch({type: ActionType.UPDATE_IS_INITIAL_LOADING, isInitialLoading: false});
    }
  }

export default updateNotificationPreferencesOnLocal;
