import appNotificationPageReducer, {initialState} from '../appNotificationPageReducer';

describe('appNotificationReducer test', () => {
  it('Should return whole state', () => {
    // @ts-ignore
    const totalState = appNotificationPageReducer(initialState, {type: ''});
    expect(totalState).toMatchObject(initialState);
  })
});
