import {Dispatch} from 'react';

import {Action, ActionType} from '../appNotificationPageReducer';
import {getNotificationPreferenceFromResponse} from '../utils';
import {getUnsubscribeCodeFromQuery} from '../../../utils/app-notifications';
import {parseAPIError} from '../../../utils/api';
import {ParsedAPIErrorType} from '../../../utils/types';
import {updateNotificationPreferences} from '../../../api/app';
import {UpdateNotificationPreferencesProps} from '../types';

const updateNotificationPreferencesOnServer = async (
  customerGID: string, dispatch: Dispatch<Action>, newNotificationPreference: UpdateNotificationPreferencesProps) => {
    const unsubscribeCode = getUnsubscribeCodeFromQuery(location.search);
    try {
      dispatch({type: ActionType.UPDATE_IS_SAVING, isSaving: true});
      dispatch({type: ActionType.UPDATE_IS_SAVED_SUCCESSFULLY, isSavedSuccessfully: false});
      const response = await updateNotificationPreferences(customerGID, unsubscribeCode, newNotificationPreference);
      const notificationPreference = getNotificationPreferenceFromResponse(response) || null;
      dispatch({type: ActionType.UPDATE_ERROR, error: null});
      dispatch({type: ActionType.UPDATE_IS_SAVED_SUCCESSFULLY, isSavedSuccessfully: true});
      dispatch({type: ActionType.UPDATE_NOTIFICATION_PREFERENCE, notificationPreference});
    } catch (apiError) {
      dispatch({type: ActionType.UPDATE_ERROR, error: parseAPIError(apiError as ParsedAPIErrorType)});
    } finally {
      dispatch({type: ActionType.UPDATE_IS_INITIAL_LOADING, isInitialLoading: false});
      dispatch({type: ActionType.UPDATE_IS_SAVING, isSaving: false});
    }
  }

export default updateNotificationPreferencesOnServer;
