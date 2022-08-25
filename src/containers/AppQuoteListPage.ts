import {ThunkActionDispatch} from 'redux-thunk';

import {connect} from 'react-redux';

import {getQuotes} from '../flux/actions/app-quotes';
import AppQuoteListPage from '../components/AppQuoteListPage';
import {GetQuotesDispatcher} from '../flux/actions/types';
import {Action} from '../flux/store';

export type QuotesProps = {
  data: unknown[]; // TODO: sync with BE the response format
  isListLoading: boolean;
  listError: null | [];
};

const mapStateToProps = ({quotes}: {quotes: QuotesProps}) => {
  return {
    quotes: quotes.data,
    isListLoading: quotes.isListLoading,
    listError: quotes.listError,
  };
};

const mapDispatchToProps = (dispatch: (action: ThunkActionDispatch<Action<GetQuotesDispatcher>>) => void) => {
  return {
    getQuotes: (customerGID: number) => {
      dispatch(getQuotes(customerGID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppQuoteListPage);
