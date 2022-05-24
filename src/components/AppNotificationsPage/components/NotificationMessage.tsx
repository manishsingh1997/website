import React from 'react';
import {Notification} from '@ergeon/core-components';
import {ParsedAPIErrorType} from '../../../utils/types';

interface NotificationMessageProps {
  error: ParsedAPIErrorType | null;
  isSavedSuccessfully: boolean;
  unsubscribeAutomatically: boolean;
}

const NotificationMessage = (props: NotificationMessageProps) => {
  const {error, isSavedSuccessfully, unsubscribeAutomatically} = props;
  return (
    <>
      {isSavedSuccessfully && (
        <Notification mode="embed" type="Success">
          {unsubscribeAutomatically
            ? 'You were unsubscribed successfully'
            : 'Notifications preferences updated successfully'}
        </Notification>
      )}
      {error && (
        <Notification mode="embed" type="Error">
          {`There was an error during processing your request: ${error}`}
        </Notification>
      )}
    </>
  );
};

export default NotificationMessage;
