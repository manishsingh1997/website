import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import {Footer, TopPanel, DropdownMenu, NavLinkContext} from '@ergeon/core-components';
import houseIcon from 'assets/icon-house.svg';

import AddressUpdatePopup from './AddressUpdatePopup';

export default class Layout extends React.Component {
  static propTypes = {
    address: PropTypes.string,
    children: PropTypes.node,
    logout: PropTypes.func.isRequired,
    openAddressUpdatePopup: PropTypes.func.isRequired,
  };

  getStreetAddress() {
    const {address} = this.props;

    if (address) {
      return address.split(',')[0];
    }

    return null;
  }

  renderDropdownMenu() {
    const {openAddressUpdatePopup, logout} = this.props;
    return (
      <DropdownMenu
        items={[
          {
            content: 'Change address',
            onClick: () => openAddressUpdatePopup(),
          },
          {
            content: 'My Order',
            href: '/request-quote',
          },
          {
            content: 'Log out',
            onClick: () => logout(),
          },
        ]}
        title={(
          <React.Fragment><img src={houseIcon}/> {this.getStreetAddress()}</React.Fragment>
        )} />
    );
  }

  render() {
    const {address} = this.props;

    return (
      <div>
        <NavLinkContext.Provider value={NavLink}>
          <TopPanel ergeonUrl="/">
            {address ? this.renderDropdownMenu() : null}
          </TopPanel>
          <div>{this.props.children}</div>
          <Footer ergeonUrl="/" />
          <AddressUpdatePopup />
        </NavLinkContext.Provider>
      </div>
    );
  }
}