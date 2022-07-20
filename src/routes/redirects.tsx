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
];
