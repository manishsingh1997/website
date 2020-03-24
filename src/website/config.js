import {includes} from 'lodash';
const configs = {
  common: {
    FENCE_REPLACEMENT: 'fence-replacement',
    FENCE_REPLACEMENT_NAME: 'Fence Installation',
    HELP_ROOT_NODE: '201900001',
    CONTACT_EMAIL: 'contact@ergeon.com',
    CARD_TRANSACTION_FEE: '2%',
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

let env, apiHost, fencequotingHost, projectsGalleryHost, websiteDomain, addressEnteredApi, leadArrivedApi;
let sentryDSN, googleMapsApiKey, stripePublicKey;

const host = document.location.host;
if (includes(EREGON_PRODUCTION, host)) {
  websiteDomain = 'ergeon.com';
  apiHost = 'https://api.ergeon.in';
  fencequotingHost = 'https://fencequoting.com';
  projectsGalleryHost = 'https://app.ergeon.com/projects-gallery';
  leadArrivedApi = 'https://tchin24eg6.execute-api.us-west-2.amazonaws.com/production/website-lead-arrived';
  addressEnteredApi = 'https://90oksb1qq9.execute-api.us-west-2.amazonaws.com/production/landing-address-submitted';
  sentryDSN = 'https://f0fe1cc5aa2e4422bec8bbd637bba091@sentry.io/1794736';
  stripePublicKey = 'pk_live_AZq0V7dLw1c3iBlADB9vdyBS';
  googleMapsApiKey = 'AIzaSyClO1qoZxVjVWmdNlNbl4W_XlAluWIb4mQ';
  env = PRODUCTION;
} else if (includes(ERGEON_STAGING, host)) {
  apiHost = 'https://apidev.ergeon.in';
  websiteDomain = 'ergeon.com';
  fencequotingHost = 'https://fencequoting-staging.firebaseapp.com';
  projectsGalleryHost = 'https://appdev.ergeon.com/projects-gallery';
  leadArrivedApi = 'https://8ijvlqff7l.execute-api.us-west-2.amazonaws.com/staging/website-lead-arrived';
  sentryDSN = 'https://f0fe1cc5aa2e4422bec8bbd637bba091@sentry.io/1794736';
  addressEnteredApi = 'https://wvt5gxjul1.execute-api.us-west-2.amazonaws.com/staging/landing-address-submitted';
  googleMapsApiKey = 'AIzaSyCJfEriZ61E_-iggE4PfQd5rs0IRSao2oI';
  stripePublicKey = 'pk_test_dV8nuwF8ciDuX1y0kOCkmzrN';
  env = STAGING;
} else if (includes(ERGEON_DEVELOPMENT, host)) {
  websiteDomain = 'ergeon.local';
  apiHost = 'http://api.ergeon.local:8000';
  fencequotingHost = 'http://fencequoting.local:8700';
  projectsGalleryHost = 'http://projects.ergeon.local:6500';
  leadArrivedApi = 'http://localhost:8080/website-lead-arrived';
  addressEnteredApi = 'http://localhost:8080/landing-address-submitted';
  googleMapsApiKey = 'AIzaSyCJfEriZ61E_-iggE4PfQd5rs0IRSao2oI';
  stripePublicKey = 'pk_test_dV8nuwF8ciDuX1y0kOCkmzrN';
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
  fencequotingHost,
  projectsGalleryHost,
  websiteDomain,
  leadArrivedApi,
  addressEnteredApi,
  sentryDSN,
  stripePublicKey,
  googleMapsApiKey,
  ...configuration,
};
