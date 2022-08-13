import React, {useCallback, useEffect, useMemo} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';
import sortBy from 'lodash/sortBy';

import {Button, NavLinkContext, Notification, SimpleTopPanel, utils} from '@ergeon/core-components';

// TODO: AddressUpdatePopup can be potentially moved to RequestQuotePage. Need investigation.
import AddressUpdatePopup from '../../containers/AddressUpdatePopup';
import AppFooter from '../common/AppFooter';
import cities from '../../data/cities-min-data.json';
import {CITIES_PAGE_PATH} from '../../website/constants';
import {isChristmasTime as getIsChristmasTime, isPDFMode, showUpcomingFeatures} from '../../utils/utils';
import {AuthState} from '../../flux/reducers/auth';
import {City} from '../AppCityPage/types';
import phoneIcon from '../../assets/icon-phone.svg';
import DropdownMenu from './components/DropdownMenu';
import MobileBottomPanel from './components/MobileBottomPanel';
import {checkRouteList} from './utils';
import useScrollPosition from './useScrollPosition';

import './index.scss';

interface LayoutProps {
  auth: Partial<AuthState>;
  children: JSX.Element;
  city?: {data: City};
  getCurrentUser: () => void;
  location: Location;
  phoneNumber: string;
}

const NO_BUTTON_PAGES = ['/fences', '/request-quote'];

const Layout = (props: LayoutProps) => {
  const {auth, children, getCurrentUser, city, phoneNumber, location} = props;

  const history = useHistory();

  const scrollPosition = useScrollPosition();

  useEffect(
    function getTheCurrentUser() {
      getCurrentUser();
    },
    [getCurrentUser]
  );

  const isChristmasTime = useMemo(() => {
    return getIsChristmasTime();
  }, []);

  const asPDF = useMemo(() => {
    return isPDFMode();
  }, []);

  const isNarrowTemplate = useMemo(() => {
    const narrowTemplates = ['/request-quote', '/app/'];
    return checkRouteList(narrowTemplates, location);
  }, [location]);

  const isNoFooterTemplate = useMemo(() => {
    const noFooterTemplates = ['/request-quote'];
    return checkRouteList(noFooterTemplates, location);
  }, [location]);

  const isShowGetAQuoteButton = useMemo(() => {
    return !checkRouteList(NO_BUTTON_PAGES, location);
  }, [location]);

  const locationsList = useMemo(() => (
    sortBy(cities, 'city').map((city) => ({
      text: city.city,
      url: `${CITIES_PAGE_PATH}/${city.slug}`,
    }))
  ), [cities]);

  const pdfDetails = useMemo(() => {
    return (
      <div className="phone-number">
        <ReactSVG className="phone-number__icon" src={phoneIcon} />
        <a className="phone-number__link" data-track-call="true" href={`tel:${phoneNumber}`}>
          {utils.formatPhoneNumber(phoneNumber)}
        </a>
      </div>
    );
  }, [utils]);

  const dropdownMenu = useMemo(() => {
    return <DropdownMenu auth={auth} />;
  }, [auth]);

  const headerWrapperClass = useMemo(() => {
    return classNames('app-header-wrapper', {'app-header-shadow': scrollPosition !== 0});
  }, [scrollPosition]);

  const widthClass = useMemo(() => {
    return classNames({'wrapper-980': isNarrowTemplate, 'wrapper-1180': !isNarrowTemplate});
  }, [isNarrowTemplate]);

  const showFooter = useMemo(() => {
    return !isNoFooterTemplate;
  }, [isNoFooterTemplate]);

  const onGetQuoteClick = useCallback(() => {
    return history.push('/request-quote');
  }, [history]);

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
        <header className={classNames('app-header', {asPDF})}>
          <div className={headerWrapperClass}>
            <SimpleTopPanel
              customerMenu={dropdownMenu}
              ergeonUrl="/"
              fencequotingUrl={`${process.env.FENCEQUOTING_HOST}/`}
              onGetQuoteClick={isShowGetAQuoteButton && onGetQuoteClick}
              pdfDetails={pdfDetails}
              pdfMode={asPDF}
              showChristmasHat={isChristmasTime}
              widthClass={widthClass}
            ></SimpleTopPanel>
          </div>
        </header>
        <main>{children}</main>
        {!asPDF && showFooter && (
          <AppFooter
            city={city?.data}
            ergeonUrl="/"
            fencequotingUrl={`${process.env.FENCEQUOTING_HOST}/`}
            locationsList={locationsList}
            productCatalogUrl={`${process.env.PRODUCT_CATALOG_URL}/`}
            projectsGalleryUrl={`${process.env.PROJECTS_GALLERY_HOST}/`}
            widthClass={widthClass}
          />
        )}
        <AddressUpdatePopup />
        {isShowGetAQuoteButton &&
          <MobileBottomPanel >
            <Button
              flavor="primary"
              onClick={onGetQuoteClick}
              size="large"
              taste="solid">
              Get a quote
            </Button>
          </MobileBottomPanel>
        }
      </NavLinkContext.Provider>
    </div>
  );
};

export default Layout;
