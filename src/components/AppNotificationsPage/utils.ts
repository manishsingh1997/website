import {Dispatch} from 'react';
import find from 'lodash/find';
import {updateNotificationPreferences} from '../../api/app';
import {Action, ActionType} from './appNotificationPageReducer';
import {COMPANY_NEWS_NOTIFICATION_TYPE} from './constant';
import {NotificationPreference} from './types';
import {updateNotificationPreferencesOnLocal} from './actions';

export const getNotificationPreferenceFromResponse = (
  response: {
    data: NotificationPreference[],
  }
): NotificationPreference | null => {
  const notificationPreference = find(response.data, 'is_primary');
  return notificationPreference ?? null;
}

/**
  * If `subscribeParameter` and `unsubscribeCode` are provided - it is a signal that user used "Unsubscribe" link
  * from marketing emails. In such case we should unsubscribe him from specific subscription.
*/
export const shouldUnsubscribe = (subscribeParameter: string | null, unsubscribeCode: string | null) => {
  return unsubscribeCode && subscribeParameter === COMPANY_NEWS_NOTIFICATION_TYPE;
}

export const fetchData = async (
    customerGID: string, 
    dispatch: Dispatch<Action>,
    notificationPreference: NotificationPreference | null,
    unsubscribeAutomatically: boolean
  ) => {
    await updateNotificationPreferencesOnLocal(customerGID, dispatch, location);
    await unsubscribeIfSubscribed(customerGID, dispatch, notificationPreference, unsubscribeAutomatically);
  }

export const unsubscribeIfSubscribed = async (
  customerGID: string, 
  dispatch: Dispatch<Action>,
  notificationPreference: NotificationPreference | null,
  unsubscribeAutomatically: boolean
) => {
  if (unsubscribeAutomatically) {
    let newState: NotificationPreference;
    if (notificationPreference) {
      dispatch({type: ActionType.UPDATE_IS_INITIAL_LOADING, isInitialLoading: true});
      newState = {...notificationPreference};
      newState.is_email_newsletter_ok = false;
      await updateNotificationPreferences(customerGID, dispatch, [newState]);
    }
  }
}
