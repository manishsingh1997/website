import React from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';

import {NavLinkContext} from '@ergeon/core-components';
import {Button, Spinner} from '@ergeon/core-components';

import SingleCard from 'components/common/SingleCard';
import {getMenuItems} from 'data/customer-app.js';

import './index.scss';

export default class AppLayout extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
    children: PropTypes.node,
    match: PropTypes.object,
  };

  state = {
    expandedSidebar: false,
  };

  renderLoader() {
    return (
      <div className="customer-app-loader">
        <Spinner active={true} borderWidth={0.10} color="green" size={48}/>
      </div>
    );
  }

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
    const {expandedSidebar} = this.state;

    return (
      <NavLinkContext.Provider value={NavLink}>
        <div className={classNames({'sidebar--expanded': expandedSidebar})} >
          <div className="sidebar-title" onClick={() => this.setState({expandedSidebar: !expandedSidebar})}>
            Menu
            <i className="icon-arrow-down" />
          </div>
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
      </NavLinkContext.Provider>
    );
  }

  render() {
    const {auth: {isAuthLoading, isUserLoading, user}} = this.props;

    const isLoading = isAuthLoading || isUserLoading;

    if (!isLoading && !user) {
      return this.renderAnonymousUser();
    }

    return (
      <div className="customer-app-layout">
        <div className="cards-wrapper">
          <div className="customer-app-sidebar card shadow soft-border">
            {this.renderSideBar()}
          </div>
          <div className="customer-app-content card shadow soft-border">
            {isLoading ? this.renderLoader() : this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
