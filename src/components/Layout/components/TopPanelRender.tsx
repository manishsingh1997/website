import React, {useEffect, useMemo, useState} from 'react';

import {useLocation} from 'react-router-dom';
import useIsMobile from '@ergeon/3d-lib/src/utils/hooks/useIsMobile';
import { SimpleTopPanel } from '@ergeon/core-components';

type TopPanelRenderProps = {
  dropdownMenu: JSX.Element;
  isShowGetAQuoteButton: boolean;
  onGetQuoteClick(): void;
  pdfDetails: JSX.Element;
  asPDF: boolean;
  isChristmasTime: boolean;
  isShowPricingButton: boolean;
  widthClass: string;
};

const TopPanelRender = (props: TopPanelRenderProps) => {
  const {
    dropdownMenu,
    isShowGetAQuoteButton,
    onGetQuoteClick,
    pdfDetails,
    asPDF,
    isChristmasTime,
    isShowPricingButton,
    widthClass,
  } = props;

  const [phoneNumber, setPhoneNumber] = useState('');

  const location = useLocation();
  const isMobileView = useIsMobile();
  const isCityPage = useMemo(() => /\/fences\/cities/gi.test(location.pathname), [location]);

  useEffect( function hideHeaderphoneOnCitiesPage () {
      if (isMobileView && isCityPage) {
        setPhoneNumber('');
      } else {
        setPhoneNumber('1-888-ERGEON1-');
      }
  }, [isMobileView, isCityPage]);

  return (
    <SimpleTopPanel
      customerMenu={dropdownMenu}
      ergeonUrl="/"
      fencequotingUrl={`${process.env.FENCEQUOTING_HOST}/`}
      onGetQuoteClick={isShowGetAQuoteButton && onGetQuoteClick}
      pdfDetails={pdfDetails}
      pdfMode={asPDF}
      phoneNumber={phoneNumber}
      showChristmasHat={isChristmasTime}
      showDisplayPricing={isShowPricingButton}
      widthClass={widthClass}
    ></SimpleTopPanel>
  );
};

export default TopPanelRender;
