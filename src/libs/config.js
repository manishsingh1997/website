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

const ERGEON_PRODUCTION = 'www.ergeon.com';
const ERGEON_STAGING = 'dev.ergeon.com';
// const JOFENCE_DEVELOPMENT = 'www.ergeon.local:6600';

let env, myErgeonURL, addressEnteredApi, leadArrivedApi, sentryDSN;

switch (document.location.host) {
  case ERGEON_PRODUCTION:
    myErgeonURL = 'https://api.ergeon.in';
    leadArrivedApi = 'https://tchin24eg6.execute-api.us-west-2.amazonaws.com/production/website-lead-arrived';
    addressEnteredApi = 'https://90oksb1qq9.execute-api.us-west-2.amazonaws.com/production/landing-address-submitted';
    sentryDSN = 'https://62f1b6784b2749d387a175c2788909ec@sentry.io/1246220';
    env = PRODUCTION;
    break;
  case ERGEON_STAGING:
    myErgeonURL = 'https://apidev.ergeon.in';
    leadArrivedApi = 'https://8ijvlqff7l.execute-api.us-west-2.amazonaws.com/staging/website-lead-arrived';
    sentryDSN = 'https://7670ed9802c84e549804212b0ee00a6a@sentry.io/1246236';
    addressEnteredApi = 'https://wvt5gxjul1.execute-api.us-west-2.amazonaws.com/staging/landing-address-submitted';
    env = STAGING;
    break;
  default:
    myErgeonURL = 'http://api.ergeon.local:8000';
    leadArrivedApi = 'https://8ijvlqff7l.execute-api.us-west-2.amazonaws.com/staging/website-lead-arrived';
    addressEnteredApi = 'https://wvt5gxjul1.execute-api.us-west-2.amazonaws.com/staging/landing-address-submitted';
    env = DEVELOPMENT;
    break;
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