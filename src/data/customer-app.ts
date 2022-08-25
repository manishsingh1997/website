import contactIcon from '@ergeon/core-components/src/assets/icon-contacts.svg';
import locationIcon from '@ergeon/core-components/src/assets/location-icon.svg';
import quoteIcon from '@ergeon/core-components/src/assets/icon-order.svg';
import orderCheckIcon from '@ergeon/core-components/src/assets/icon-order-check.svg';
import appointmentsIcon from '@ergeon/core-components/src/assets/icon-appointments.svg';
import preferencesIcon from '@ergeon/core-components/src/assets/icon-preference.svg';

import {UNSUBSCRIBE_CODE_QUERY_NAME} from '../utils/app-notifications';
import {showUpcomingFeatures} from '../utils/utils';

export const getMenuItems = (basePath: string, unsubscribeCode: string | null) => {
  const notificationsSearchQuery = unsubscribeCode ? `?${UNSUBSCRIBE_CODE_QUERY_NAME}=${unsubscribeCode}` : '';

  const menuItems = [
    {
      isTitle: true,
      title: 'My Projects',
    },
    {
      path: `${basePath}/quotes`,
      title: 'Quotes',
      iconSVG: quoteIcon,
      className: 'quotes-item',
      active: showUpcomingFeatures('ENG-17268'),
    },
    {
      path: `${basePath}/orders`,
      title: 'Orders',
      iconSVG: orderCheckIcon,
      className: 'orders-item',
      active: true,
    },
    {
      path: `${basePath}/appointments`,
      title: 'Appointments',
      iconSVG: appointmentsIcon,
      className: 'appointments-item',
      active: true,
    },
    {
      isTitle: true,
      title: 'My Account',
    },
    {
      path: `${basePath}/profile`,
      title: 'Profile',
      iconSVG: contactIcon,
      className: 'contacts-item',
      active: true,
    },
    {
      path: `${basePath}/addresses`,
      title: 'Addresses',
      iconSVG: locationIcon,
      className: 'addresses-item',
      active: true,
    },
    {
      path: `${basePath}/settings${notificationsSearchQuery}`,
      title: 'Settings',
      iconSVG: preferencesIcon,
      className: 'notifications-item',
      active: true,
    },
  ];
  return menuItems.filter((item) => item.active);
};

export const getMyProjectsMenuItems = (basePath: string) => {
  const menuItems = [
    {
      path: `${basePath}/quotes`,
      title: 'Quotes',
      iconSVG: quoteIcon,
      className: 'quotes-item',
      active: showUpcomingFeatures('ENG-17268'),
    },
    {
      path: `${basePath}/orders`,
      title: 'Orders',
      iconSVG: orderCheckIcon,
      className: 'orders-item',
      active: true,
    },
    {
      path: `${basePath}/appointments`,
      title: 'Appointments',
      iconSVG: appointmentsIcon,
      className: 'appointments-item',
      active: true,
    },
  ];
  return menuItems.filter((item) => item.active);
};

export const getMyAccountMenuItems = (basePath: string, unsubscribeCode: string | null) => {
  const notificationsSearchQuery = unsubscribeCode ? `?${UNSUBSCRIBE_CODE_QUERY_NAME}=${unsubscribeCode}` : '';

  const menuItems = [
    {
      path: `${basePath}/profile`,
      title: 'Profile',
      iconSVG: contactIcon,
      className: 'contacts-item',
      active: true,
    },
    {
      path: `${basePath}/addresses`,
      title: 'Addresses',
      iconSVG: locationIcon,
      className: 'addresses-item',
      active: true,
    },
    {
      path: `${basePath}/settings${notificationsSearchQuery}`,
      title: 'Settings',
      iconSVG: preferencesIcon,
      className: 'notifications-item',
      active: true,
    },
  ];
  return menuItems.filter((item) => item.active);
};
