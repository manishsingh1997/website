import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';
import queryString from 'query-string';
import {Redirect} from 'react-router-dom';

import AppPage from '../common/AppPage';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import {getUnsubscribeCodeFromQuery} from '../../utils/app-notifications';
import {AppNotificationsProps} from './types';
import {COMPANY_NEWS_NOTIFICATION_TYPE} from './constant';
import {fetchData, shouldUnsubscribe} from './utils';
import appNotificationPageReducer, {ActionType, initialState} from './appNotificationPageReducer';
import Content from './Content';

/**
 * Current page can be accessed by normally authenticated user OR from unsubscribe link.
 * The latter option doesn't require authentication if unsubscribe link will include GET params:
 * - unsubscribe-code
 *  secret code that is included in every marketing email,
 *  different for each customer, used for security
 * - auto
 *  whenever to unsubscribe automatically or not
 *
 * If "auto" param is present - unsubscribe the user automatically.
 * To avoid the automatic unsubscription on every page reload (for example, by navigating back to
 * the page from history), redirect user to the same page without "auto" argument,
 * but remember that option and unsubscibe only once.
 */

const AppNotificationsPage = (props: AppNotificationsProps) => {
  const [state, dispatch] = useReducer(appNotificationPageReducer, initialState);
  const {
    error,
    isInitialLoading,
    isSaving,
    isSavedSuccessfully,
    initialError,
    notificationPreference,
    unsubscribeAutomatically
  } = state;
  const customerGID = useContext(CustomerGIDContext);
  const {location} = props;
  const parsedQuery = useMemo(() => queryString.parse(location.search), [location]);
  const {auto, ...queryWithoutAuto} = parsedQuery;
  const unsubscribeCode = useMemo(
    () => getUnsubscribeCodeFromQuery(location.search) as string | null, [location]);

  useEffect(function setAutoUnsubscribeFlag() {
    if (parsedQuery.auto === COMPANY_NEWS_NOTIFICATION_TYPE && !unsubscribeAutomatically) {
      dispatch({type: ActionType.UPDATE_UNSUBSCRIBE_AUTOMATICALLY, unsubscribeAutomatically: true});
    }
  }, [parsedQuery, unsubscribeAutomatically]);

  if (shouldUnsubscribe(auto as string | null, unsubscribeCode)) {
    const pathName = location.pathname;
    const search = queryString.stringify(queryWithoutAuto);
    return <Redirect to={`${pathName}?${search}`} />;
  }

  return (
    <AppPage
      className="notifications-page"
      error={initialError}
      fetchData={() => fetchData(customerGID, dispatch, notificationPreference, unsubscribeAutomatically)}
      isLoading={isInitialLoading}
      renderContent={() =>
        <Content
          customerGID={customerGID}
          dispatch={dispatch}
          error={error}
          isSavedSuccessfully={isSavedSuccessfully}
          isSaving={isSaving}
          notificationPreference={notificationPreference}
          unsubscribeAutomatically={unsubscribeAutomatically} />
      }
      renderHeader={() => 'Settings'}
    />
  )
};

export default AppNotificationsPage;
