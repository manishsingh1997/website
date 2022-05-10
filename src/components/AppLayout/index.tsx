import React from 'react';
import {Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';

import {Button} from '@ergeon/core-components';

import somethingWrongIcon from '@ergeon/core-components/src/assets/icon-something-wrong@2x.svg';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import AppLoader from '../common/AppLoader';
import SingleCard from '../common/SingleCard';
import PathNavLink from '../common/PathNavLink';
import {getMenuItems} from '../../data/customer-app';
import {isQuoteDetailURL, isUnsubscribeURL} from '../../utils/urls';
import {getUnsubscribeCodeFromQuery} from '../../utils/app-notifications';
import {AppLayoutProps} from './types';
import './index.scss';

export default class AppLayout extends React.Component<AppLayoutProps> {

  renderAnonymousUser() {
    const content = (
      <div className="center">
        <h4 className="spacing after__is-12">Not signed in</h4>
        <p className="spacing after__is-24">Please sign in first to access the app</p>
        <Link to="/app/sign-in">
          <Button className="spacing before__is-12" size="large" type="submit">
            Sign In
          </Button>
        </Link>
      </div>
    );
    return <SingleCard className="customer-app-anonymous-user" content={content} />;
  }

  renderSideBar() {
    const {location, match} = this.props;
    const unsubscribedCode = getUnsubscribeCodeFromQuery(location.search) as string | null;

    return (
      <div>
        <ul className="siblings-list">
          {getMenuItems(match.url, unsubscribedCode).map((menuItem) => (
            <PathNavLink activeClassName="active-link" key={`app-menu-${menuItem.title}`} to={menuItem.path}>
              <li className="siblings-list-item">
                <div className="menu-icon-wrapper">
                  <ReactSVG src={menuItem.iconSVG} />
                </div>
                <div className="siblings-list-item__wrapper">{menuItem.title}</div>
              </li>
            </PathNavLink>
          ))}
        </ul>
      </div>
    );
  }

  renderChildren(isLoading: boolean) {
    const {match} = this.props;

    if (isLoading) {
      return <AppLoader />;
    }

    return (
      <CustomerGIDContext.Provider value={match.params.customerGid}>{this.props.children}</CustomerGIDContext.Provider>
    );
  }

  renderUserError() {
    const content = (
      <div className="center">
        <div className="center spacing after__is-24">
          <ReactSVG className="icon-invalid-lock" src={somethingWrongIcon} />
        </div>
        <h4 className="center spacing after__is-12">Sorry, but something went wrong</h4>
        <div>Please try to reload the page or sign-in again.</div>
        <Link to="/app/sign-in">
          <Button className="spacing before__is-12" size="large" type="submit">
            Sign In
          </Button>
        </Link>
      </div>
    );
    return <SingleCard className="customer-app-anonymous-user" content={content} />;
  }

  render() {
    const {
      auth: {isAuthLoading, isUserLoading, user, userError},
      location,
    } = this.props;
    const isLoading = isAuthLoading || isUserLoading;
    const isQuotePage = isQuoteDetailURL(location.pathname);

    if (!isLoading && !user) {
      if (isUnsubscribeURL(location.pathname, location.search)) {
        // Unsubscribe page is special case - authentication not needed
      } else if (isQuotePage) {
        // Quote detail page is special case - authentication not needed, don't show sidebar
      } else if (userError) {
        console.error(userError);
        return this.renderUserError();
      } else {
        return this.renderAnonymousUser();
      }
    }

    return (
      <div className="customer-app-layout">
        {isQuotePage ? (
          this.renderChildren(isLoading)
        ) : (
          <div className="cards-wrapper">
            <div className="customer-app-sidebar card shadow soft-border">{this.renderSideBar()}</div>
            <div className="customer-app-content card shadow soft-border">{this.renderChildren(isLoading)}</div>
          </div>
        )}
      </div>
    );
  }
}
