import {ParsedAPIErrorType} from '../../utils/types';

import {NotificationPreference} from './types';

export enum ActionType {
  UPDATE_ERROR = 'updateError',
  UPDATE_IS_INITIAL_LOADING = 'updateIsInitialLoading',
  UPDATE_IS_SAVING = 'updateIsSaving',
  UPDATE_IS_SAVED_SUCCESSFULLY = 'updateIsSavedSuccessfully',
  UPDATE_INITIAL_ERROR = 'updateInitialError',
  UPDATE_NOTIFICATION_PREFERENCE = 'updateNotificationPreference',
  UPDATE_UNSUBSCRIBE_AUTOMATICALLY = 'updateUnsubscribeAutomatically'
};

export const initialState = {
  error: null,
  isInitialLoading: true,
  isSaving: false,
  isSavedSuccessfully: false,
  initialError: null,
  notificationPreference: null,
  unsubscribeAutomatically: false
};

export type Action =
  {type: ActionType.UPDATE_ERROR, error: ParsedAPIErrorType | null} | 
  {type: ActionType.UPDATE_IS_INITIAL_LOADING, isInitialLoading: boolean} |
  {type: ActionType.UPDATE_IS_SAVING, isSaving: boolean} |
  {type: ActionType.UPDATE_IS_SAVED_SUCCESSFULLY, isSavedSuccessfully: boolean} | 
  {type: ActionType.UPDATE_INITIAL_ERROR, initialError: ParsedAPIErrorType | null} |
  {type: ActionType.UPDATE_NOTIFICATION_PREFERENCE, notificationPreference: NotificationPreference | null} |
  {type: ActionType.UPDATE_UNSUBSCRIBE_AUTOMATICALLY, unsubscribeAutomatically: boolean};
  
export type State = {
  error: ParsedAPIErrorType | null;
  isInitialLoading: boolean;
  isSaving: boolean;
  isSavedSuccessfully: boolean;
  initialError: ParsedAPIErrorType | null;
  notificationPreference: NotificationPreference | null;
  unsubscribeAutomatically: boolean;
};

const appNotificationPageReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_ERROR:
      return {...state, error: action.error};
    case ActionType.UPDATE_IS_INITIAL_LOADING:
      return {...state, isInitialLoading: action.isInitialLoading};
    case ActionType.UPDATE_IS_SAVING:
      return {...state, isSaving: action.isSaving};
    case ActionType.UPDATE_IS_SAVED_SUCCESSFULLY:
      return {...state, isSavedSuccessfully: action.isSavedSuccessfully};
    case ActionType.UPDATE_INITIAL_ERROR:
      return {...state, initialError: action.initialError};
    case ActionType.UPDATE_NOTIFICATION_PREFERENCE:
      return {...state, notificationPreference: action.notificationPreference};
    case ActionType.UPDATE_UNSUBSCRIBE_AUTOMATICALLY:
      return {...state, unsubscribeAutomatically: action.unsubscribeAutomatically};
    default:
      return {...state};
  }
}

export default appNotificationPageReducer;
