import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';

import {Footer, TopPanel, DropdownMenu, NavLinkContext, Spinner} from '@ergeon/core-components';
import userIcon from '@ergeon/core-components/src/assets/icon-user.svg';
import logOutIcon from '@ergeon/core-components/src/assets/icon-logout.svg';

import {isChristmasTime, showUpcomingFeatures} from 'utils/utils';
import {getMenuItems} from 'data/customer-app.js';
// TODO: AddressUpdatePopup can be potentially moved to RequestQuotePage. Need investigation.
import AddressUpdatePopup from 'containers/AddressUpdatePopup';

import './index.scss';

const SIGN_IN_LINK_ID = 'app-sign-in-link';

// TODO: Update DropdownMenu in core-components so it can render <Link to=""> instead of <a href="">
class WebsiteDropdownMenu extends DropdownMenu {

  renderMenuItem({content, href, iconSVG, special, onClick}, index) {
    return (
      <NavLink
        activeClassName="active-link"
        className={`menu-item ${special ? 'special' : ''}`}
        key={index}
        onClick={() => {
          this.setState({showMenu: false});
          onClick && onClick();
        }}
        to={href}>
        <div className="menu-title">
          <span className={'icon'}><ReactSVG src={iconSVG}/></span>
          <span>{content}</span>
        </div>
      </NavLink>
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
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.isChristmasTime = isChristmasTime();
    this.isUpcomingFeaturesEnabled = showUpcomingFeatures();
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  checkTemplateWidth() {
    const {location} = this.props;
    const pathname = location? location.pathname : '/';
    let isItNarrowTemplate = false;
    const narrowTemplates = [
      '/request-quote',
      '/app/',
    ];
    narrowTemplates.forEach(path => {
      if (pathname.includes(path)) isItNarrowTemplate = true;
    });
    return isItNarrowTemplate;
  }

  renderDropdownMenu() {
    const {auth: {isAuthLoading, isUserLoading, user}} = this.props;
    if (isUserLoading || isAuthLoading) {
      return (
        <Link className="sign-in-link" to="/app/sign-in">
          <li className="link">
            <div className="flex-align-middle">
              <span><img className="sign-in-icon" src={userIcon}/></span>
              <Spinner active={true} borderWidth={0.10} color="gray" size={16}/>
            </div>
          </li>
        </Link>
      );
    }
    if (user) {
      const menuItems = getMenuItems(`/app/${user.gid}`).map(
        menuItem => ({
          content: menuItem.title,
          href: menuItem.path,
          iconSVG: menuItem.iconSVG,
        })
      );
      menuItems[menuItems.length - 1].special = true;   // bottom line will be shown for special
      menuItems.push({
        content: 'Log out',
        href: '/app/logout',
        iconSVG: logOutIcon,
      });
      return (
        <WebsiteDropdownMenu
          items={menuItems}
          title={(
            <React.Fragment>
              <img className="sign-in-icon" src={userIcon}/>
              <span className="user-full-name">{user.full_name}</span>
            </React.Fragment>
          )} />
      );
    }
    return (
      <Link className="sign-in-link" to="/app/sign-in">
        <li className="link" id={SIGN_IN_LINK_ID}>
          <img className="sign-in-icon" src={userIcon}/>
          <span className="user-full-name">Sign In</span>
        </li>
      </Link>
    );
  }

  render() {
    const widthClass = this.checkTemplateWidth()? 'wrapper-980' : 'wrapper-1180';
    return (
      <div className="app-layout">
        <NavLinkContext.Provider value={NavLink}>
          <WebsiteTopPanel
            customerMenu={this.isUpcomingFeaturesEnabled ? this.renderDropdownMenu() : null}
            ergeonUrl="/"
            showChristmasHat={this.isChristmasTime}
            widthClass={widthClass} >
          </WebsiteTopPanel>
          <div>{this.props.children}</div>
          <Footer ergeonUrl="/"  widthClass={widthClass}/>
          <AddressUpdatePopup />
        </NavLinkContext.Provider>
      </div>
    );
  }
}
