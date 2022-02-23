import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';

import logOutIcon from '@ergeon/core-components/src/assets/icon-logout.svg';
import userIcon from '@ergeon/core-components/src/assets/icon-user.svg';
import {
  DropdownMenu,
  Footer,
  NavLinkContext,
  Notification,
  Spinner,
  TopPanel,
} from '@ergeon/core-components';
import {formatPhoneNumber} from '@ergeon/core-components/src/libs/utils/utils';

import phoneIcon from 'assets/icon-phone.svg';
import {isChristmasTime, isPDFMode, showUpcomingFeatures} from 'utils/utils';
import {getMenuItems} from 'data/customer-app.js';
// TODO: AddressUpdatePopup can be potentially moved to RequestQuotePage. Need investigation.
import AddressUpdatePopup from 'containers/AddressUpdatePopup';
import COVIDNotification from './COVIDNotification';

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
        to={href}>
        <div className="menu-title">
          <span className={'icon'}><ReactSVG src={iconSVG}/></span>
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
    const pathname = location? location.pathname : '/';
    let included = false;
    routes.forEach(path => {
      if (pathname.includes(path)) included = true;
    });
    return included;
  }

  checkTemplateWidth() {
    const narrowTemplates = [
      '/request-quote',
      '/app/',
    ];
    return this.checkRouteList(narrowTemplates);
  }

  isNoFooterTemplate() {
    const noFooterTemplates = [
      '/request-quote',
    ];
    return this.checkRouteList(noFooterTemplates);
  }

  renderDropdownMenu() {
    const {auth: {isAuthLoading, isUserLoading, user}} = this.props;
    if (isUserLoading || isAuthLoading) {
      return (
        <Link className="sign-in-link" key="dropp-loading" to="/app/sign-in">
          <li className="link-wrapper">
            <div className="icon-and-arrow">
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
          key="dropp-user"
          title={(
            <span key="dropp-user-icon">
              <div className="user-name-menu-item">
                <img className="sign-in-icon" src={userIcon}/>
                <span className="user-full-name">{user.full_name}</span>
              </div>
            </span>
          )} />
      );
    }
    return (
      <Link className="sign-in-link" key="dropp-sign-in" to="/app/sign-in">
        <li className="link-wrapper" id={SIGN_IN_LINK_ID}>
          <img className="sign-in-icon" src={userIcon}/>
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
        <a className="phone-number__link" href={`tel:${phoneNumber}`}>{formatPhoneNumber(phoneNumber)}</a>
      </div>
    );
  }

  render() {
    const widthClass = this.checkTemplateWidth()? 'wrapper-980' : 'wrapper-1180';
    const showFooter = !this.isNoFooterTemplate();
    const asPDF = isPDFMode();
    const {location} = this.props;
    return (
      <div className="app-layout">
        {showUpcomingFeatures() && (
          <div className="upcoming-features-wrapper">
            <Notification type="Information">
              <h6 className="additional-header">Experimental mode</h6>
              Upcoming Features are shown
            </Notification>
          </div>
        )}
        <COVIDNotification location={location}/>
        <NavLinkContext.Provider value={NavLink}>
          <TopPanel
            customerMenu={this.renderDropdownMenu()}
            ergeonUrl="/"
            fencequotingUrl={`${process.env.FENCEQUOTING_HOST}/`}
            pdfDetails={this.renderPdfDetails()}
            pdfMode={asPDF}
            projectsGalleryUrl={`${process.env.PROJECTS_GALLERY_HOST}/`}
            showChristmasHat={this.isChristmasTime}
            widthClass={widthClass}>
          </TopPanel>
          <div>{this.props.children}</div>
          {
            !asPDF &&
            showFooter &&
            <Footer
              ergeonUrl="/"
              fencequotingUrl={`${process.env.FENCEQUOTING_HOST}/`}
              productCatalogUrl={`${process.env.PRODUCT_CATALOG_URL}/`}
              projectsGalleryUrl={`${process.env.PROJECTS_GALLERY_HOST}/`}
              widthClass={widthClass} />
          }
          <AddressUpdatePopup />
        </NavLinkContext.Provider>
      </div>
    );
  }
}
