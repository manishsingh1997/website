import contactIcon from '@ergeon/core-components/src/assets/icon-contacts.svg';
import houseIcon from '@ergeon/core-components/src/assets/icon-house.svg';
import orderIcon from '@ergeon/core-components/src/assets/icon-order.svg';
import appointmentsIcon from '@ergeon/core-components/src/assets/icon-appointments.svg';

export const getMenuItems = (basePath) => {
  return [
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
};
