import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';

import {NavLinkContext} from '@ergeon/core-components';

import {getMenuItems} from 'data/customer-app.js';

import './index.scss';

export default class AppLayout extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.object,
  };

  state = {
    expandedSidebar: false,
  };

  renderSideBar() {
    const {match} = this.props;
    const {expandedSidebar} = this.state;

    return (
      <NavLinkContext.Provider value={NavLink}>
        <div className={classNames({'sidebar--expanded': expandedSidebar})} >
          <div className="sidebar-title">
            Menu
            <i className="icon-arrow-down" onClick={() => this.setState({expandedSidebar: !expandedSidebar})} />
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
    return (
      <div className="customer-app-layout">
        <div className="cards-wrapper">
          <div className="customer-app-sidebar card shadow soft-border">
            {this.renderSideBar()}
          </div>
          <div className="customer-app-content card shadow soft-border">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
