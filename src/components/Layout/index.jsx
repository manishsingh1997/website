import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

import {Footer, TopPanel, DropdownMenu, NavLinkContext, Spinner} from '@ergeon/core-components';
import userIcon from '@ergeon/core-components/src/assets/icon-user.svg';

// TODO: move AddressUpdatePopup to RequestQuotePage, it should be local popup for RequestQuotePage
//       And we don't need redux for it.
import AddressUpdatePopup from './AddressUpdatePopup';

import './index.scss';

// TODO: Update DropdownMenu in core-components so it can render <Link to=""> instead of <a href="">
class AppDropdownMenu extends DropdownMenu {

  renderMenuItem({content, href, special, onClick}, index) {
    return (
      <Link
        className={`menu-item ${special ? 'special' : ''}`}
        key={index}
        onClick={() => {
          this.setState({showMenu: false});
          onClick && onClick();
        }}
        to={href}>
        {content}
      </Link>
    );
  }

}

export default class Layout extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.node,
    getCurrentUser: PropTypes.func.isRequired,
    isShowUpcomingFeatures: PropTypes.bool.isRequired,
    showUpcomingFeatures: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getCurrentUser();
    // this.props.location is not available in Layout, using window instead
    const location = window.location || (window.document && window.document.location);
    if (location && location.search) {
      if ('upcoming-features' in queryString.parse(location.search)) {
        this.props.showUpcomingFeatures();
      }
    }
  }

  renderDropdownMenu() {
    const {auth: {isAuthLoading, isUserLoading, user}} = this.props;
    if (isUserLoading || isAuthLoading) {
      return (
        <Link className="sign-in-link" to="/app/sign-in">
          <li className="link">
            <span><img className="sign-in-icon" src={userIcon}/></span>
            <Spinner active={true} borderWidth={0.10} color="gray" size={16}/>
          </li>
        </Link>
      );
    }
    if (user) {
      return (
        <AppDropdownMenu
          items={[
            {
              content: 'Contacts',
              href: `/app/${user.gid}/contacts`,
            },
            {
              content: 'Houses',
              href: `/app/${user.gid}/houses`,
            },
            {
              content: 'Orders',
              href: `/app/${user.gid}/orders`,
            },
            {
              content: 'Appointments',
              href: `/app/${user.gid}/appointments`,
              special: true,  // bottom line will be drown for special
            },
            {
              content: 'Log out',
              href: '/',
              onClick: () => console.log('Log out STUB'),
            },
          ]}
          title={(
            <React.Fragment><img className="sign-in-icon" src={userIcon}/>{user.full_name}</React.Fragment>
          )} />
      );
    }
    return (
      <Link className="sign-in-link" to="/app/sign-in">
        <li className="link">
          <img className="sign-in-icon" src={userIcon}/>Sign In
        </li>
      </Link>
    );
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
