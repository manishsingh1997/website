import '@testing-library/jest-dom';
import {QuoteActionTypes} from '../../actions/app-quotes';
import quotesReducer from '../app-quotes';

const mockAction = {
  data: [],
  error: {
    nonFieldErrors: [''],
  },
};

describe('app quotes reducer', () => {
  it('should return GET_QUOTES_START state correctly', () => {
    expect(
      quotesReducer(
        {
          data: null,
          isListLoading: false,
          listError: null,
        },
        {...mockAction, type: QuoteActionTypes.GET_QUOTES_START}
      )
    ).toEqual({data: null, isListLoading: true, listError: null});
  });

  it('should return GET_QUOTES_DONE state correctly', () => {
    expect(
      quotesReducer(
        {
          data: null,
          isListLoading: false,
          listError: null,
        },
        {...mockAction, type: QuoteActionTypes.GET_QUOTES_DONE}
      )
    ).toEqual({data: [], isListLoading: false, listError: null});
  });

  it('should return GET_QUOTES_ERROR state correctly', () => {
    expect(
      quotesReducer(
        {
          data: null,
          isListLoading: false,
          listError: null,
        },
        {...mockAction, type: QuoteActionTypes.GET_QUOTES_ERROR}
      )
    ).toEqual({data: null, isListLoading: false, listError: {nonFieldErrors: ['']}});
  });

  it('should return the initial state when type is not passed', () => {
    expect(
      quotesReducer(
        {
          data: null,
          isListLoading: false,
          listError: null,
        },
        // @ts-ignore
        {...mockAction, type: ''}
      )
    ).toEqual({data: null, isListLoading: false, listError: null});
  });
});
