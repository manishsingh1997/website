import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {ReactSVG} from 'react-svg';

import {NavLinkContext} from '@ergeon/core-components';

import {getMenuItems} from 'data/customer-app.js';

import './index.scss';

export default class AppLayout extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.object,
  };

  renderMenus() {
    const {match} = this.props;

    return (
      <NavLinkContext.Provider value={NavLink}>
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
      </NavLinkContext.Provider>
    );
  }

  render() {

    return (
      <div className="customer-app-layout">
        <div className="flex-cards">
          <div className="customer-app-menu card shadow soft-border">
            {this.renderMenus()}
          </div>
          <div className="customer-app-content card shadow soft-border">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
