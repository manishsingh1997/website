import React, {FormEvent} from 'react';
import classNames from 'classnames';
import queryString from 'query-string';
import {Redirect} from 'react-router-dom';

import {Button, Checkbox, Notification, Spinner} from '@ergeon/core-components';
import {
  getNotificationPreferences as getNotificationPreferencesAPI,
  updateNotificationPreferences as updateNotificationPreferencesAPI,
} from '../../api/app';
import {getUnsubscribeCodeFromQuery} from '../../utils/app-notifications';
import {parseAPIError} from '../../utils/api';
import AppPage from '../common/AppPage';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import {ParsedAPIErrorType} from '../../utils/types';
import {
  NotificationPreference,
  UpdateNotificationPreferences,
  AppNotificationsState
} from './types';

const COMPANY_NEWS_NOTIFICATION_TYPE = 'is_email_newsletter_ok';

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

type AppNotificationsProps = {
  location: Location;
};

export default class AppNotificationsPage extends React.Component<AppNotificationsProps, AppNotificationsState> {

  state = {
    isInitialLoading: true,
    initialError: null,
    unsubscribeAutomatically: false,
    primaryContact: null,
    isSaving: false,
    isSavedSuccessfully: false,
    error: null,
  };

  componentDidMount() {
    this.setAutoUnsubscribeFlag();
  }

  static contextType = CustomerGIDContext;

  async fetchData() {
    await this.getNotificationPreferences();
    if (this.state.unsubscribeAutomatically) {
      this.setState({isInitialLoading: true});
      let primaryContact: NotificationPreference;
      if (this.state.primaryContact) {
        primaryContact = this.state.primaryContact;
        primaryContact.is_email_newsletter_ok = false;
        await this.updateNotificationPreferences([primaryContact]);
      }
    }
  }

  // We don't need this data in redux store for now, so calling API directly
  async getNotificationPreferences() {
    const customerGID = this.context;
    const unsubscribeCode = getUnsubscribeCodeFromQuery(location.search);
    try {
      // we support primary contact only for now
      const response = await getNotificationPreferencesAPI(customerGID, unsubscribeCode);
      const primaryContact = this.getPrimaryContactFromResponse(response) || null;
      this.setState({
        primaryContact,
        initialError: null,
      });
    } catch (apiError) {
      this.setState({primaryContact: null, initialError: parseAPIError(apiError as ParsedAPIErrorType)});
    } finally {
      this.setState({isInitialLoading: false});
    }
  }

  async updateNotificationPreferences(data: UpdateNotificationPreferences) {
    const customerGID = this.context;
    const unsubscribeCode = getUnsubscribeCodeFromQuery(location.search);
    try {
      this.setState({isSaving: true, isSavedSuccessfully: false});
      const response = await updateNotificationPreferencesAPI(customerGID, unsubscribeCode, data);
      const primaryContact = this.getPrimaryContactFromResponse(response) || null;
      this.setState({
        error: null,
        isSavedSuccessfully: true,
        primaryContact
      });
    } catch (apiError) {
      this.setState({
        error: parseAPIError(apiError as ParsedAPIErrorType),
      });
    } finally {
      this.setState({isInitialLoading: false, isSaving: false});
    }
  }

  getPrimaryContactFromResponse(response: {data: NotificationPreference[]}): NotificationPreference | undefined {
    if (response.data) {
      return response.data.find((contact) => contact['is_primary']);
    }
  }

  setAutoUnsubscribeFlag() {
    const parsedQuery = queryString.parse(this.props.location.search);
    if (parsedQuery.auto === COMPANY_NEWS_NOTIFICATION_TYPE && !this.state.unsubscribeAutomatically) {
      this.setState({unsubscribeAutomatically: true});
    }
  }

  /**
   * If `auto` and `unsubscribeCode` are provided - it is a signal that user used "Unsubscribe" link
   * from marketing emails. In such case we should unsubscribe him from specific subscription.
   */
  shouldUnsubscribe(subscribeParameter: string, unsubscribeCode: string | null) {
    if (!unsubscribeCode) {
      // The unsubscribe code should be provided for it to work
      return false;
    }
    switch (subscribeParameter) {
      case COMPANY_NEWS_NOTIFICATION_TYPE:
        return true;
      default:
        return false;
    }
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.updateNotificationPreferences([this.state.primaryContact]);
    this.setState({unsubscribeAutomatically: false});
  }

  handleCheckChange(value: boolean) {
    let primaryContact: NotificationPreference;
    if (this.state.primaryContact) {
      primaryContact = this.state.primaryContact;
      primaryContact[COMPANY_NEWS_NOTIFICATION_TYPE] = value;
      this.setState({isSavedSuccessfully: false, primaryContact});
    }
  }

  renderContent() {
    const {error, isSaving, isSavedSuccessfully, primaryContact} = this.state;
    const isSubscribedToNews = primaryContact && primaryContact[COMPANY_NEWS_NOTIFICATION_TYPE];
    const primaryEmail = primaryContact && primaryContact['primary_email']['identifier'];

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="spacing after__is-24">
            <div className="label">Email</div>
            <div className="spacing after__is-24">{primaryEmail}</div>
            <Checkbox
              checked={isSubscribedToNews}
              disabled={isSaving}
              onClick={(value: boolean) => this.handleCheckChange(value)}
            >
              <div>
                <div>
                  <b>Company News</b>
                </div>
                <p>I&apos;m ok to receive interesting home improvement insights from Ergeon over email</p>
              </div>
            </Checkbox>
          </div>
          <Button
            className={classNames({'is-loading': isSaving})}
            data-testid='update-preferences'
            disabled={isSaving}
            size="large"
            type="submit">
            {isSaving ? <Spinner active={true} borderWidth={0.1} size={25} /> : 'Update preferences'}
          </Button>
        </form>
        {isSavedSuccessfully && (
          <Notification mode="embed" type="Success">
            {this.state.unsubscribeAutomatically
              ? 'You were unsubscribed successfully'
              : 'Notifications preferences updated successfully'}
          </Notification>
        )}
        {error && (
          <Notification mode="embed" type="Error">
            {`There was an error during processing your request: ${error}`}
          </Notification>
        )}
      </React.Fragment>
    );
  }

  render() {
    const {location} = this.props;
    const parsedQuery = queryString.parse(location.search);
    const {auto, ...queryWithoutAuto} = parsedQuery;
    const unsubscribeCode = getUnsubscribeCodeFromQuery(location.search) as string | null;

    if (this.shouldUnsubscribe(auto as string, unsubscribeCode)) {
      const pathName = location.pathname;
      const search = queryString.stringify(queryWithoutAuto);
      return <Redirect to={`${pathName}?${search}`} />;
    }

    return (
      <div>
        <AppPage
          className="notifications-page"
          error={this.state.initialError}
          fetchData={this.fetchData.bind(this)}
          isLoading={this.state.isInitialLoading}
          renderContent={this.renderContent.bind(this)}
          renderHeader={() => 'Notifications preferences'}
        />
      </div>
    );
  }
}
