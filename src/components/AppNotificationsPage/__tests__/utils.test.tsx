import { updateNotificationPreferencesOnServer } from '../actions';
import {Action, ActionType} from '../appNotificationPageReducer';
import {NotificationPreference} from '../types';
import {unsubscribeIfSubscribed} from '../utils';
import * as axios from '../__mocks__/axios';

jest.mock('../__mocks__/axios');

describe('Utils', () => {
  
  it('Should unsubscribe automatically', async () => {
    await unsubscribeIfSubscribed('12345', (action: Action) => {
      expect(action.type).toBe(ActionType.UPDATE_IS_INITIAL_LOADING);
    }, {} as NotificationPreference, true);
  });

  it('Should return error', async () => {
    // @ts-ignore
    axios.default = null;
    await updateNotificationPreferencesOnServer('12345', (action: Action) => {
      if (action.type === ActionType.UPDATE_ERROR) {
        expect(action.error).toBeDefined();
      }
    }, null);
  });

});
