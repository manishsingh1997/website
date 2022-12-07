import { updateNotificationPreferencesOnServer } from '../actions';
import {Action, ActionType} from '../appNotificationPageReducer';
import {unsubscribeIfSubscribed} from '../utils';
import * as axios from '../__mocks__/axios';

jest.mock('../__mocks__/axios');

describe('Utils', () => {

  it('Should unsubscribe automatically', async () => {
    const dispatch = jest.fn();

    await unsubscribeIfSubscribed('12345', dispatch, true);

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.UPDATE_IS_SAVED_SUCCESSFULLY,
      isSavedSuccessfully: false,
    });
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
