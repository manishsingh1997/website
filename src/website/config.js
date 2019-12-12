import {includes} from 'lodash';
const configs = {
  common: {
    FENCE_REPLACEMENT: 'fence-replacement',
    FENCE_REPLACEMENT_NAME: 'Fence Installation',
    HELP_ROOT_NODE: '201900001',
  },
  'development': {},
  'staging': {},
  'production': {},
};

export const PRODUCTION = 'production';
export const STAGING = 'staging';
export const DEVELOPMENT = 'development';

const EREGON_PRODUCTION = ['www.ergeon.com', 'ergeon.com', 'prod.ergeon.com'];
const ERGEON_STAGING = ['dev.ergeon.com'];
const ERGEON_DEVELOPMENT = ['ergeon.local:6600'];

let env, apiHost, websiteDomain, addressEnteredApi, leadArrivedApi, sentryDSN, googleMapsApiKey;
const host = document.location.host;
if (includes(EREGON_PRODUCTION, host)) {
  websiteDomain = 'ergeon.com';
  apiHost = 'https://api.ergeon.in';
  leadArrivedApi = 'https://tchin24eg6.execute-api.us-west-2.amazonaws.com/production/website-lead-arrived';
  addressEnteredApi = 'https://90oksb1qq9.execute-api.us-west-2.amazonaws.com/production/landing-address-submitted';
  sentryDSN = 'https://f0fe1cc5aa2e4422bec8bbd637bba091@sentry.io/1794736';
  googleMapsApiKey = 'AIzaSyClO1qoZxVjVWmdNlNbl4W_XlAluWIb4mQ';
  env = PRODUCTION;
} else if (includes(ERGEON_STAGING, host)) {
  apiHost = 'https://apidev.ergeon.in';
  websiteDomain = 'ergeon.com';
  leadArrivedApi = 'https://8ijvlqff7l.execute-api.us-west-2.amazonaws.com/staging/website-lead-arrived';
  sentryDSN = 'https://f0fe1cc5aa2e4422bec8bbd637bba091@sentry.io/1794736';
  addressEnteredApi = 'https://wvt5gxjul1.execute-api.us-west-2.amazonaws.com/staging/landing-address-submitted';
  googleMapsApiKey = 'AIzaSyCJfEriZ61E_-iggE4PfQd5rs0IRSao2oI';
  env = STAGING;
} else if (includes(ERGEON_DEVELOPMENT, host)) {
  websiteDomain = 'ergeon.local';
  apiHost = 'http://api.ergeon.local:8000';
  leadArrivedApi = 'http://localhost:8080/website-lead-arrived';
  addressEnteredApi = 'http://localhost:8080/landing-address-submitted';
  googleMapsApiKey = 'AIzaSyCJfEriZ61E_-iggE4PfQd5rs0IRSao2oI';
  env = DEVELOPMENT;
} else {
  console.error('Domain is unexpected');
}

const configuration = configs[env];

export default {
  ...configs.common,
  level: env,
  env,
  apiHost,
  websiteDomain,
  leadArrivedApi,
  addressEnteredApi,
  sentryDSN,
  googleMapsApiKey,
  ...configuration,
};
