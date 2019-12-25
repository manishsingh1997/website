import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';

import {Footer, TopPanel, DropdownMenu, NavLinkContext, Spinner} from '@ergeon/core-components';
import userIcon from '@ergeon/core-components/src/assets/icon-user.svg';

import {isChristmasTime, showUpcomingFeatures} from 'utils/utils';
// TODO: move AddressUpdatePopup to RequestQuotePage, it should be local popup for RequestQuotePage
//       And we don't need redux for it.
import AddressUpdatePopup from './AddressUpdatePopup';

import './index.scss';

const SIGN_IN_LINK_ID = 'app-sign-in-link';

// TODO: Update DropdownMenu in core-components so it can render <Link to=""> instead of <a href="">
class WebsiteDropdownMenu extends DropdownMenu {

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

// TODO: Update TopPanel in core-components to hide mobile menu if custom link was pressed
class WebsiteTopPanel extends TopPanel {
  hideMenu = () => {
    if (!this.navMenu.contains(event.target) || event.target.id === SIGN_IN_LINK_ID) {
      this.setState({showMobileMenu: false});
      document.removeEventListener('click', this.hideMenu);
    }
  };
}

export default class Layout extends React.Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.node,
    getCurrentUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.isChristmasTime = isChristmasTime();
    this.isUpcomingFeaturesEnabled = showUpcomingFeatures();
  }

  componentDidMount() {
    this.props.getCurrentUser();
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
        <WebsiteDropdownMenu
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
              href: '/app/logout',
            },
          ]}
          title={(
            <React.Fragment><img className="sign-in-icon" src={userIcon}/>{user.full_name}</React.Fragment>
          )} />
      );
    }
    return (
      <Link className="sign-in-link" to="/app/sign-in">
        <li className="link" id={SIGN_IN_LINK_ID}>
          <img className="sign-in-icon" src={userIcon}/>Sign In
        </li>
      </Link>
    );
  }

  render() {

    return (
      <div className="app-layout">
        <NavLinkContext.Provider value={NavLink}>
          <WebsiteTopPanel ergeonUrl="/" showChristmasHat={this.isChristmasTime}>
            {this.isUpcomingFeaturesEnabled ? this.renderDropdownMenu() : null}
          </WebsiteTopPanel>
          <div>{this.props.children}</div>
          <Footer ergeonUrl="/" />
          <AddressUpdatePopup />
        </NavLinkContext.Provider>
      </div>
    );
  }
}
