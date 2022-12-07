import React from 'react';

import logOutIcon from '@ergeon/core-components/src/assets/icon-logout-solid.svg';
import helpIcon from '@ergeon/core-components/src/assets/icon-question-mark-line.svg';

import {AuthState} from '../../../../flux/reducers/auth';
import {useIsMobileWidth} from '../../../common/AppQuoteComponents/QuoteLine/customHooks';

import LoadingDropdownMenu from './LoadingDropdownMenu';
import MainDropdownMenu from './MainDropdownMenu';
import AuthDropdownMenu from './AuthDropdownMenu';
import {MenuItemProp} from './types';
import MobileLogoutAndHelpSection from './MobileLogoutAndHelpSection';

import '../../index.scss';

interface DropdownMenuProps {
  auth: Partial<AuthState>;
  onGetQuoteClick?(): void;
}

const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    auth: {isAuthLoading, isUserLoading, user},
    onGetQuoteClick,
  } = props;

  const MobileMenuList = [
    {
      content: 'Help',
      href: '/help',
      iconSVG: helpIcon,
    },
    {
      content: 'Log out',
      href: '/app/logout',
      iconSVG: logOutIcon,
    },
  ];

  const isMobileWidth = useIsMobileWidth();

  if (isUserLoading || isAuthLoading) {
    return <LoadingDropdownMenu />;
  }

  if (user) {
    return (
      <>
        <MainDropdownMenu user={user} />
        {isMobileWidth && MobileMenuList.length && (
          <div className="menu">
            {MobileMenuList.map((menuItem) => (
              <MobileLogoutAndHelpSection key={menuItem.href} menuItem={menuItem as MenuItemProp} />
            ))}
          </div>
        )}
      </>
    );
  }

  return <AuthDropdownMenu onGetQuoteClick={onGetQuoteClick} />;
};

export default DropdownMenu;
