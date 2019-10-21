import {includes} from 'lodash';
const configs = {
  common: {
    FENCE_REPLACEMENT: 'fence-replacement',
    FENCE_REPLACEMENT_NAME: 'Fence Installation',
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
  sentryDSN = 'https://62f1b6784b2749d387a175c2788909ec@sentry.io/1246220';
  env = PRODUCTION;
} else if (includes(ERGEON_STAGING, host)) {
  myErgeonURL = 'https://apidev.ergeon.in';
  leadArrivedApi = 'https://8ijvlqff7l.execute-api.us-west-2.amazonaws.com/staging/website-lead-arrived';
  sentryDSN = 'https://7670ed9802c84e549804212b0ee00a6a@sentry.io/1246236';
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
  myErgeonURL,
  leadArrivedApi,
  addressEnteredApi,
  sentryDSN,
  ...configuration,
};