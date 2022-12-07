import React, {Dispatch, FormEvent} from 'react';

import {ParsedAPIErrorType} from '../../utils/types';

import {Action, ActionType} from './appNotificationPageReducer';
import {COMPANY_NEWS_NOTIFICATION_TYPE} from './constant';
import {NotificationPreference} from './types';
import {updateNotificationPreferencesOnServer} from './actions';
import EmailSubscribeForm from './components/EmailSubscribeForm';
import NotificationMessage from './components/NotificationMessage';

interface ContentProps {
  customerGID: string;
  dispatch: Dispatch<Action>;
  error: ParsedAPIErrorType | null;
  isSaving: boolean;
  isSavedSuccessfully: boolean;
  notificationPreference: NotificationPreference | null;
  unsubscribeAutomatically: boolean;
}

const Content = (props: ContentProps) => {
  const {
    customerGID,
    dispatch,
    error,
    isSaving,
    isSavedSuccessfully,
    notificationPreference,
    unsubscribeAutomatically
  } = props;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateNotificationPreferencesOnServer(customerGID, dispatch, [notificationPreference]);
    dispatch({type: ActionType.UPDATE_UNSUBSCRIBE_AUTOMATICALLY, unsubscribeAutomatically: false});
  }
  
  const handleCheckChange = (value: boolean) => {
    let newNotificationPreference: NotificationPreference;
    if (notificationPreference) {
      newNotificationPreference = {...notificationPreference};
      newNotificationPreference[COMPANY_NEWS_NOTIFICATION_TYPE] = value;
      dispatch({type: ActionType.UPDATE_IS_SAVED_SUCCESSFULLY, isSavedSuccessfully: false});
      dispatch({type: ActionType.UPDATE_NOTIFICATION_PREFERENCE, notificationPreference: newNotificationPreference});
    }
  }

  const isSubscribedToNews = notificationPreference && notificationPreference[COMPANY_NEWS_NOTIFICATION_TYPE];
  const primaryEmail = notificationPreference && notificationPreference['primary_email']['identifier'];
  return (
    <React.Fragment>
      <EmailSubscribeForm
        handleCheckChange={handleCheckChange}
        handleSubmit={handleSubmit}
        isSaving={isSaving}
        isSubscribedToNews={isSubscribedToNews}
        primaryEmail={primaryEmail} />
      <NotificationMessage
        error={error}
        isSavedSuccessfully={isSavedSuccessfully}
        unsubscribeAutomatically={unsubscribeAutomatically} />
    </React.Fragment>
  )
};

export default Content;
