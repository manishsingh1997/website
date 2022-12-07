export const temporalRedirectRoutes = [
  {
    from: '/cities',
    to: '/',
  },
  {
    from: '/locations',
    to: '/',
  },
];

export const internalRedirectRoutes = [
  {
    from: '/app/:customerGid/houses',
    to: '/app/:customerGid/addresses',
  },
  {
    from: '/app/:customerGid/contacts',
    to: '/app/:customerGid/profile',
  },
  {
    from: '/app/:customerGid/notifications',
    to: '/app/:customerGid/settings',
  },
];
