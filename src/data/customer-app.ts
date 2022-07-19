import contactIcon from '@ergeon/core-components/src/assets/icon-contacts.svg';
import locationIcon from '@ergeon/core-components/src/assets/location-icon.svg';
import orderIcon from '@ergeon/core-components/src/assets/icon-order.svg';
import appointmentsIcon from '@ergeon/core-components/src/assets/icon-appointments.svg';
import notificationIcon from '@ergeon/core-components/src/assets/icon-notification.svg';
import {UNSUBSCRIBE_CODE_QUERY_NAME} from '../utils/app-notifications';

export const getMenuItems = (basePath: string, unsubscribeCode: string | null) => {
  const notificationsSearchQuery = unsubscribeCode ? `?${UNSUBSCRIBE_CODE_QUERY_NAME}=${unsubscribeCode}` : '';

  const menuItems = [
    {
      path: `${basePath}/contacts`,
      title: 'Contacts',
      iconSVG: contactIcon,
      className: 'contacts-item'
    },
    {
      path: `${basePath}/addresses`,
      title: 'Addresses',
      iconSVG: locationIcon,
      className: 'addresses-item'
    },
    {
      path: `${basePath}/orders`,
      title: 'Orders',
      iconSVG: orderIcon,
      className: 'orders-item'
    },
    {
      path: `${basePath}/appointments`,
      title: 'Appointments',
      iconSVG: appointmentsIcon,
      className: 'appointments-item'
    },
    {
      path: `${basePath}/notifications${notificationsSearchQuery}`,
      title: 'Notifications',
      iconSVG: notificationIcon,
      className: 'notifications-item'
    },
  ];
  return menuItems;
};
