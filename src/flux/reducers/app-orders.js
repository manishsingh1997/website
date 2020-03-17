import {actionTypes} from '../actions/app-orders';

const initialState = {
  listData: null,
  isListLoading: false,
  listError: null,
  itemData: {},
  isItemLoading: false,
  itemError: null,
};

const ordersReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_START:
      return {...state, isListLoading: true};
    case actionTypes.GET_ORDERS_DONE:
      return {...state,
        isListLoading: false,
        listError: null,
        listData: action.data,
      };
    case actionTypes.GET_ORDERS_ERROR:
      return {...state,
        isListLoading: false,
        listError: action.error,
      };
    case actionTypes.GET_ORDER_START:
      return {...state,
        isItemLoading: true,
      };
    case actionTypes.GET_ORDER_DONE:
      return {...state,
        isItemLoading: false,
        itemError: null,
        itemData: {
          [action.data.id]: action.data,
        },
      };
    case actionTypes.GET_ORDER_ERROR:
      return {...state,
        isItemLoading: false,
        itemError: action.error,
      };
    default:
      return state;
  }
};

export default ordersReducer;
