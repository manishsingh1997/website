import {ThunkActionDispatch} from 'redux-thunk';

import {connect} from 'react-redux';

import {getQuotes} from '../flux/actions/app-quotes';
import AppQuoteListPage from '../components/AppQuoteListPage';
import {GetQuotesDispatcher} from '../flux/actions/types';
import {Action} from '../flux/store';
import {CustomerQuoteResponseProps} from '../components/AppQuoteListPage/types';
import {HouseType} from '../components/types';

type QuoteStateProps = {
  data: CustomerQuoteResponseProps[];
  isListLoading: boolean;
  listError: null | [];
};

type SelectedQuoteStateProps = {
  data: HouseType;
};

type StateProps = {
  quotes: QuoteStateProps;
  selectedHouse: SelectedQuoteStateProps;
};

const mapStateToProps = ({quotes, selectedHouse}: StateProps) => {
  return {
    selectedHouse: selectedHouse.data,
    quotes: quotes.data,
    isListLoading: quotes.isListLoading,
    listError: quotes.listError,
  };
};

const mapDispatchToProps = (dispatch: (action: ThunkActionDispatch<Action<GetQuotesDispatcher>>) => void) => {
  return {
    getQuotes: (quoteSecret: string) => {
      dispatch(getQuotes(quoteSecret));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppQuoteListPage);
