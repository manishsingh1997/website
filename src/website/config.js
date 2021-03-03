/*
This file should not have any import.
 */

export const PRODUCTION = 'production';
export const STAGING = 'staging';
export const DEVELOPMENT = 'development';

let env, apiHost, blogHost, fencequotingHost, projectsGalleryHost,
  websiteDomain, addressEnteredApi, leadArrivedApi, cookbookWebsite, tawkAPIKey;
let googleMapsApiKey, stripePublicKey, publicWebsite;

if (process.env.NODE_ENV === PRODUCTION) {
  websiteDomain = 'www.ergeon.com';
  apiHost = 'https://api.ergeon.in';
  blogHost = 'https://www.ergeon.com/blog';
  fencequotingHost = 'https://fencequoting.com';
  projectsGalleryHost = `https://${websiteDomain}/projects-gallery`;
  leadArrivedApi = 'https://tchin24eg6.execute-api.us-west-2.amazonaws.com/production/website-lead-arrived';
  addressEnteredApi = 'https://90oksb1qq9.execute-api.us-west-2.amazonaws.com/production/landing-address-submitted';
  publicWebsite = `https://${websiteDomain}`;
  stripePublicKey = 'pk_live_AZq0V7dLw1c3iBlADB9vdyBS';
  googleMapsApiKey = 'AIzaSyAg5pqGm1NfU7whDrZrn2DEeYlPhb6nNQY';
  tawkAPIKey = '5c4c7f0251410568a1086d00';
  env = PRODUCTION;
  cookbookWebsite = 'https://cookbook.ergeon.in/';
} else if (process.env.NODE_ENV === STAGING) {
  apiHost = 'https://apidev.ergeon.in';
  websiteDomain = 'dev.ergeon.com';
  blogHost = 'https://dev.ergeon.com/blog';
  fencequotingHost = 'https://fencequoting-staging.firebaseapp.com';
  projectsGalleryHost = `https://${websiteDomain}/projects-gallery`;
  leadArrivedApi = 'https://8ijvlqff7l.execute-api.us-west-2.amazonaws.com/staging/website-lead-arrived';
  addressEnteredApi = 'https://wvt5gxjul1.execute-api.us-west-2.amazonaws.com/staging/landing-address-submitted';
  publicWebsite = `https://${websiteDomain}`;
  googleMapsApiKey = 'AIzaSyB7MA3CPKqhfpDp38ChLxaVUDYOnumBhyM';
  stripePublicKey = 'pk_test_dV8nuwF8ciDuX1y0kOCkmzrN';
  tawkAPIKey = '5c4c7f0251410568a1086d00';
  env = STAGING;
  cookbookWebsite = 'https://cookbook.ergeon.in/';
} else {
  websiteDomain = 'ergeon.local';
  apiHost = 'http://api.ergeon.local:8000';
  blogHost = 'https://dev.ergeon.com/blog';
  fencequotingHost = 'http://fencequoting.local:8700';
  projectsGalleryHost = 'http://ergeon.local:6500/projects-gallery';
  leadArrivedApi = 'http://localhost:8080/website-lead-arrived';
  addressEnteredApi = 'http://localhost:8080/landing-address-submitted';
  publicWebsite = `http://${websiteDomain}:6600`;
  googleMapsApiKey = 'AIzaSyA4eghi3j4pNWSjnQVU2mkS8j5nD4aSzww';
  stripePublicKey = 'pk_test_dV8nuwF8ciDuX1y0kOCkmzrN';
  tawkAPIKey = '5c4c7f0251410568a1086d00';
  env = DEVELOPMENT;
  cookbookWebsite = 'https://cookbook.ergeon.in/';
}

// Extract a second level domain. It is used in the auth service.
const website2ndLevelDomain = websiteDomain.match(/\.?(\w+\.\w+)$/i)[1];

// COVID notification URL
const policyUrl = `${publicWebsite}/help/202000376`;

export default {
  addressEnteredApi,
  apiHost,
  blogHost,
  env,
  fencequotingHost,
  googleMapsApiKey,
  leadArrivedApi,
  level: env,
  projectsGalleryHost,
  policyUrl,
  publicWebsite,
  stripePublicKey,
  tawkAPIKey,
  websiteDomain,
  cookbookWebsite,
  website2ndLevelDomain,
};
