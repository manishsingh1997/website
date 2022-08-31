import {Dispatch} from 'react';

import find from 'lodash/find';

import {Action, ActionType} from './appNotificationPageReducer';
import {COMPANY_NEWS_NOTIFICATION_TYPE} from './constant';
import {NotificationPreference} from './types';
import {updateNotificationPreferencesOnLocal, updateNotificationPreferencesOnServer} from './actions';
import {getNotificationPreference} from './actions/updateNotificationPreferencesOnLocal';

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
    unsubscribeAutomatically: boolean
  ) => {
    await updateNotificationPreferencesOnLocal(customerGID, dispatch, location);
    await unsubscribeIfSubscribed(customerGID, dispatch, unsubscribeAutomatically);
  }

export const unsubscribeIfSubscribed = async (
  customerGID: string,
  dispatch: Dispatch<Action>,
  unsubscribeAutomatically: boolean
) => {
  if (unsubscribeAutomatically) {
    const notificationPreference = await getNotificationPreference(customerGID, location);
    if (notificationPreference) {
      let newState: NotificationPreference;
      dispatch({type: ActionType.UPDATE_IS_INITIAL_LOADING, isInitialLoading: true});
      newState = {...notificationPreference};
      newState.is_email_newsletter_ok = false;
      await updateNotificationPreferencesOnServer(customerGID, dispatch, [newState]);
    }
  }
}
