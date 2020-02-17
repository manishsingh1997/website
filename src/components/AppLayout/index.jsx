import React from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink} from 'react-router-dom';
import {ReactSVG} from 'react-svg';

import {Button} from '@ergeon/core-components';

import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import AppLoader from 'components/common/AppLoader';
import SingleCard from 'components/common/SingleCard';
import {getMenuItems} from 'data/customer-app';
import {isQuoteDetailURL} from 'utils/urls';

import './index.scss';

export default class AppLayout extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
    children: PropTypes.node,
    location: PropTypes.object,
    match: PropTypes.object,
  };

  renderAnonymousUser() {
    const content = (
      <div className="center">
        <h4 className="spacing after__is-12">Not signed in</h4>
        <p className="spacing after__is-24">Please sign in first to access the app</p>
        <Link to="/app/sign-in">
          <Button
            className="spacing before__is-12"
            size="large"
            type="submit">
            Sign In
          </Button>
        </Link>
      </div>
    );
    return <SingleCard className="customer-app-anonymous-user" content={content} />;
  }

  renderSideBar() {
    const {match} = this.props;

    return (
      <div>
        <ul className="siblings-list">
          {getMenuItems(match.url).map(
            (menuItem => (
              <NavLink activeClassName="active-link" key={`app-menu-${menuItem.title}`} to={menuItem.path}>
                <li className="siblings-list-item">
                  <div className="menu-icon-wrapper">
                    <ReactSVG src={menuItem.iconSVG} />
                  </div>
                  <div className="siblings-list-item__wrapper">{menuItem.title}</div>
                </li>
              </NavLink>
            ))
          )}
        </ul>
      </div>
    );
  }

  renderChildren(isLoading) {
    const {match} = this.props;

    if (isLoading) {
      return <AppLoader />;
    }

    return (
      <CustomerGIDContext.Provider value={match.params.customerGid}>
        {this.props.children}
      </CustomerGIDContext.Provider>
    );
  }

  render() {
    const {auth: {isAuthLoading, isUserLoading, user}, location} = this.props;

    const isLoading = isAuthLoading || isUserLoading;

    // Quote detail page is special case - don't show sidebar
    const isQuotePage = isQuoteDetailURL(location.pathname);

    if (!isLoading && !isQuotePage && !user) {
      // TODO: if auth has error - show message with error
      return this.renderAnonymousUser();
    }

    return (
      <div className="customer-app-layout">
        {isQuotePage ? this.renderChildren(isLoading) : (
          <div className="cards-wrapper">
            <div className="customer-app-sidebar card shadow soft-border">
              {this.renderSideBar()}
            </div>
            <div className="customer-app-content card shadow soft-border">
              {this.renderChildren(isLoading)}
            </div>
          </div>
        )}
      </div>
    );
  }
}
