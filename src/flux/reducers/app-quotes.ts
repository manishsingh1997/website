import {ParsedAPIErrorType} from '../../utils/types';
import {QuoteActionTypes} from '../actions/app-quotes';

export type QuotesReducerState = {
  data: unknown[] | null;
  isListLoading: boolean;
  listError: ParsedAPIErrorType | null;
};

export type QuoteReducerAction = {
  data: unknown[];
  error: ParsedAPIErrorType;
  type: keyof typeof QuoteActionTypes;
};

const initialState: QuotesReducerState = {
  data: null,
  isListLoading: false,
  listError: null,
};

const quotesReducer = (state = initialState, action: QuoteReducerAction) => {
  switch (action.type) {
    case QuoteActionTypes.GET_QUOTES_START:
      return {...state, isListLoading: true};
    case QuoteActionTypes.GET_QUOTES_DONE:
      return {...state, isListLoading: false, listError: null, data: action.data};
    case QuoteActionTypes.GET_QUOTES_ERROR:
      return {
        ...state,
        isListLoading: false,
        listError: action.error,
      };
    default:
      return state;
  }
};

export default quotesReducer;
