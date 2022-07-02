import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {NavLink, Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';

import logOutIcon from '@ergeon/core-components/src/assets/icon-logout.brand.svg';
import userIcon from '@ergeon/core-components/src/assets/icon-user.brand.svg';
import {DropdownMenu, NavLinkContext, Notification, Spinner, SimpleTopPanel, utils} from '@ergeon/core-components';

import phoneIcon from 'assets/icon-phone.svg';
import {isChristmasTime, isPDFMode, showUpcomingFeatures} from 'utils/utils';
import {getMenuItems} from 'data/customer-app.ts';
// TODO: AddressUpdatePopup can be potentially moved to RequestQuotePage. Need investigation.
import AddressUpdatePopup from 'containers/AddressUpdatePopup';

import AppFooter from '../common/AppFooter';
import cities from '../../data/cities-min-data.json';
import {CITIES_PAGE_PATH} from '../../website/constants';

import './index.scss';

const SIGN_IN_LINK_ID = 'app-sign-in-link';

// TODO: Update DropdownMenu in core-components so it can render <Link to=""> instead of <a href="">
class WebsiteDropdownMenu extends DropdownMenu {
  renderMenuItem({content, href, iconSVG, special, onClick}, index) {
    return (
      <NavLink
        activeClassName="active-link"
        className={classNames('menu-item', {special})}
        key={index}
        onClick={() => {
          this.setState({showMenu: false});
          onClick && onClick();
        }}
        to={href}
      >
        <div className="menu-title">
          <span className={'icon'}>
            <ReactSVG src={iconSVG} />
          </span>
          <span>{content}</span>
        </div>
      </NavLink>
    );
  }
}

export default class Layout extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.node,
    history: PropTypes.object,
    getCurrentUser: PropTypes.func.isRequired,
    location: PropTypes.object,
    phoneNumber: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.isChristmasTime = isChristmasTime();
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  checkRouteList(routes = []) {
    const {location} = this.props;
    const pathname = location ? location.pathname : '/';
    let included = false;
    routes.forEach((path) => {
      if (pathname.includes(path)) included = true;
    });
    return included;
  }

  checkTemplateWidth() {
    const narrowTemplates = ['/request-quote', '/app/'];
    return this.checkRouteList(narrowTemplates);
  }

  isNoFooterTemplate() {
    const noFooterTemplates = ['/request-quote'];
    return this.checkRouteList(noFooterTemplates);
  }

  getLocationsList() {
    return cities.map((city) => ({
      text: city.city,
      url: `${CITIES_PAGE_PATH}/${city.slug}`,
    }));
  }

  renderDropdownMenu() {
    const {
      auth: {isAuthLoading, isUserLoading, user},
    } = this.props;
    if (isUserLoading || isAuthLoading) {
      return (
        <Link className="sign-in-link" key="dropp-loading" to="/app/sign-in">
          <li className="link-wrapper">
            <div className="icon-and-arrow">
              <span>
                <img className="sign-in-icon" src={userIcon} />
              </span>
              <Spinner active={true} borderWidth={0.1} color="blue" size={16} />
            </div>
          </li>
        </Link>
      );
    }
    if (user) {
      const menuItems = getMenuItems(`/app/${user.gid}`).map((menuItem) => ({
        content: menuItem.title,
        href: menuItem.path,
        iconSVG: menuItem.iconSVG,
      }));
      menuItems[menuItems.length - 1].special = true; // bottom line will be shown for special
      menuItems.push({
        content: 'Log out',
        href: '/app/logout',
        iconSVG: logOutIcon,
      });
      return (
        <WebsiteDropdownMenu
          items={menuItems}
          key="dropp-user"
          title={
            <span key="dropp-user-icon">
              <div className="user-name-menu-item">
                <img className="sign-in-icon" src={userIcon} />
                <span className="user-full-name">{user.full_name}</span>
              </div>
            </span>
          }
        />
      );
    }
    return (
      <Link className="sign-in-link" key="dropp-sign-in" to="/app/sign-in">
        <li className="link-wrapper" id={SIGN_IN_LINK_ID}>
          <img className="sign-in-icon" src={userIcon} />
          <span className="user-full-name">Sign In</span>
        </li>
      </Link>
    );
  }

  renderPdfDetails() {
    const {phoneNumber} = this.props;
    return (
      <div className="phone-number">
        <ReactSVG className="phone-number__icon" src={phoneIcon} />
        <a className="phone-number__link" data-track-call="true" href={`tel:${phoneNumber}`}>
          {utils.formatPhoneNumber(phoneNumber)}
        </a>
      </div>
    );
  }

  render() {
    const widthClass = this.checkTemplateWidth() ? 'wrapper-980' : 'wrapper-1180';
    const showFooter = !this.isNoFooterTemplate();
    const asPDF = isPDFMode();
    return (
      <div className="app-layout">
        {showUpcomingFeatures('ENG-1XX') && (
          <div className="upcoming-features-wrapper">
            <Notification type="Information">
              <h6 className="additional-header">Experimental mode</h6>
              Upcoming Features are shown
            </Notification>
          </div>
        )}
        <NavLinkContext.Provider value={NavLink}>
          <header>
            <SimpleTopPanel
              customerMenu={this.renderDropdownMenu()}
              ergeonUrl="/"
              fencequotingUrl={`${process.env.FENCEQUOTING_HOST}/`}
              onGetQuoteClick={() => this.props.history.push('/request-quote')}
              pdfDetails={this.renderPdfDetails()}
              pdfMode={asPDF}
              showChristmasHat={this.isChristmasTime}
              widthClass={widthClass}
            ></SimpleTopPanel>
          </header>
          <main>{this.props.children}</main>
          {!asPDF && showFooter && (
            <AppFooter
              city={this.props.city.data}
              ergeonUrl="/"
              fencequotingUrl={`${process.env.FENCEQUOTING_HOST}/`}
              locationsList={this.getLocationsList()}
              productCatalogUrl={`${process.env.PRODUCT_CATALOG_URL}/`}
              projectsGalleryUrl={`${process.env.PROJECTS_GALLERY_HOST}/`}
              widthClass={widthClass}
            />
          )}
          <AddressUpdatePopup />
        </NavLinkContext.Provider>
      </div>
    );
  }
}
