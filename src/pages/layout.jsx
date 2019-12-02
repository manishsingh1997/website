import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {Footer, TopPanel, DropdownMenu, NavLinkContext} from '@ergeon/core-components';

import AddressUpdatePopup from 'components/address-update-popup';
import {actionTriggers} from 'actions/address-actions';
import houseIcon from 'assets/icon-house.svg';

class Layout extends React.Component {
  static propTypes = {
    address: PropTypes.string,
    children: PropTypes.node,
    dispatch: PropTypes.func,
  };

  getStreetAddress() {
    const {address} = this.props;

    if (address) {
      return address.split(',')[0];
    }

    return null;
  }

  renderDropdownMenu() {
    const {dispatch} = this.props;
    return (
      <DropdownMenu
        items={[
          {
            content: 'Change address',
            onClick: () => dispatch(actionTriggers.openAddressUpdatePopup()),
          },
          {
            content: 'My Order',
            href: '/request-quote',
          },
          {
            content: 'Log out',
            onClick: () => dispatch(actionTriggers.logout()),
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

export default connect(() => ({
  // address: state.address.address, // TODO: Show address in top header once tested.
  address: null,
}))(Layout);