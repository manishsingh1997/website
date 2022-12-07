import React from  'react';

import {render} from '@testing-library/react';

import {ParsedAPIErrorType} from '../../../utils/types';
import {Action, ActionType} from '../appNotificationPageReducer';
import Content from '../Content';
import {NotificationPreference} from '../types';
import * as axios from '../__mocks__/axios';

jest.mock('../__mocks__/axios');

describe('Content component', () => {
  it('Should return correct actions', async () => {
    const np = await axios.default();
    render(
      <Content
        customerGID={'12345'}
        dispatch={(action: Action) => {
          if (action.type === ActionType.UPDATE_IS_SAVED_SUCCESSFULLY) {
            expect(action.isSavedSuccessfully).toBeFalsy();
          }
          if (action.type === ActionType.UPDATE_NOTIFICATION_PREFERENCE) {
            expect(action.notificationPreference).toBeDefined();
            expect(action.notificationPreference?.is_email_newsletter_ok).toBeFalsy();
          }
        }}
        error={{data: {}} as ParsedAPIErrorType}
        isSavedSuccessfully={true}
        isSaving={false}
        notificationPreference={np.data[0] as NotificationPreference}
        unsubscribeAutomatically={false} />
    );
  });
})
