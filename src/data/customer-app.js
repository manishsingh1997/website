import contactIcon from '@ergeon/core-components/src/assets/icon-contacts.svg';
import houseIcon from '@ergeon/core-components/src/assets/icon-house.svg';
import orderIcon from '@ergeon/core-components/src/assets/icon-order.svg';
import appointmentsIcon from '@ergeon/core-components/src/assets/icon-appointments.svg';
import notificationIcon from '@ergeon/core-components/src/assets/icon-notification.svg';
import {UNSUBSCRIBE_CODE_QUERY_NAME} from 'utils/app-notifications';
import {showUpcomingFeatures} from 'utils/utils';

export const getMenuItems = (basePath, unsubscribeCode) => {
  const notificationsSearchQuery = unsubscribeCode ? `?${UNSUBSCRIBE_CODE_QUERY_NAME}=${unsubscribeCode}` : '';

  const menuItems = [
    {
      path: `${basePath}/contacts`,
      title: 'Contacts',
      iconSVG: contactIcon,
    },
    {
      path: `${basePath}/houses`,
      title: 'Houses',
      iconSVG: houseIcon,
    },
    {
      path: `${basePath}/orders`,
      title: 'Orders',
      iconSVG: orderIcon,
    },
    {
      path: `${basePath}/appointments`,
      title: 'Appointments',
      iconSVG: appointmentsIcon,
    },
  ];
  if (showUpcomingFeatures()) {
    menuItems.push({
      path: `${basePath}/notifications${notificationsSearchQuery}`,
      title: 'Notifications',
      iconSVG: notificationIcon,
    });
  }
  return menuItems;
};
