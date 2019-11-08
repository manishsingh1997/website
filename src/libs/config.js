import {includes} from 'lodash';
const configs = {
  common: {
    FENCE_REPLACEMENT: 'fence-replacement',
    FENCE_REPLACEMENT_NAME: 'Fence Installation',
    HELP_ROOT_NODE: '7ogSo9cm210otrVI',
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

let env, myErgeonURL, addressEnteredApi, leadArrivedApi, sentryDSN;
const host = document.location.host;
if (includes(EREGON_PRODUCTION, host)) {
  myErgeonURL = 'https://api.ergeon.in';
  leadArrivedApi = 'https://tchin24eg6.execute-api.us-west-2.amazonaws.com/production/website-lead-arrived';
  addressEnteredApi = 'https://90oksb1qq9.execute-api.us-west-2.amazonaws.com/production/landing-address-submitted';
  sentryDSN = 'https://f0fe1cc5aa2e4422bec8bbd637bba091@sentry.io/1794736';
  env = PRODUCTION;
} else if (includes(ERGEON_STAGING, host)) {
  myErgeonURL = 'https://apidev.ergeon.in';
  leadArrivedApi = 'https://8ijvlqff7l.execute-api.us-west-2.amazonaws.com/staging/website-lead-arrived';
  sentryDSN = 'https://f0fe1cc5aa2e4422bec8bbd637bba091@sentry.io/1794736';
  addressEnteredApi = 'https://wvt5gxjul1.execute-api.us-west-2.amazonaws.com/staging/landing-address-submitted';
  env = STAGING;
} else if (includes(ERGEON_DEVELOPMENT, host)) {
  myErgeonURL = 'http://api.ergeon.local:8000';
  leadArrivedApi = 'https://8ijvlqff7l.execute-api.us-west-2.amazonaws.com/staging/website-lead-arrived';
  addressEnteredApi = 'https://wvt5gxjul1.execute-api.us-west-2.amazonaws.com/staging/landing-address-submitted';
  env = DEVELOPMENT;
} else {
  console.error('Domain is unexpected');
}

const configuration = configs[env];

export default {
  ...configs.common,
  level: env,
  env,
  myErgeonURL,
  leadArrivedApi,
  addressEnteredApi,
  sentryDSN,
  ...configuration,
};
