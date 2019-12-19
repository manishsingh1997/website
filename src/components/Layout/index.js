import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import queryString from 'query-string';

import {Footer, TopPanel, NavLinkContext} from '@ergeon/core-components';

import AddressUpdatePopup from './AddressUpdatePopup';

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    isShowUpcomingFeatures: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    openAddressUpdatePopup: PropTypes.func.isRequired,
    showUpcomingFeatures: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // this.props.location is not available in Layout, using window instead
    if (window.location && window.location.search) {
      if ('upcoming-features' in queryString.parse(window.location.search)) {
        this.props.showUpcomingFeatures();
      }
    }
  }

  renderDropdownMenu() {
    return null;
  }

  render() {
    const {isShowUpcomingFeatures} = this.props;

    return (
      <div className="app-layout">
        <NavLinkContext.Provider value={NavLink}>
          <TopPanel ergeonUrl="/">
            {isShowUpcomingFeatures ? this.renderDropdownMenu() : null}
          </TopPanel>
          <div>{this.props.children}</div>
          <Footer ergeonUrl="/" />
          <AddressUpdatePopup />
        </NavLinkContext.Provider>
      </div>
    );
  }
}
