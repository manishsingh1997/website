/*
This file should not have any import.
 */

export const PRODUCTION = 'production';
export const STAGING = 'staging';
export const DEVELOPMENT = 'development';

let env, apiHost, blogHost, fencequotingHost, projectsGalleryHost,
  websiteDomain, addressEnteredApi, leadArrivedApi, tawkAPIKey;
let googleMapsApiKey, stripePublicKey, publicWebsite;

if (process.env.NODE_ENV === PRODUCTION) {
  websiteDomain = 'ergeon.com';
  apiHost = 'https://api.ergeon.in';
  blogHost = 'https://blog.ergeon.com';
  fencequotingHost = 'https://fencequoting.com';
  projectsGalleryHost = 'https://www.ergeon.com/projects-gallery';
  leadArrivedApi = 'https://tchin24eg6.execute-api.us-west-2.amazonaws.com/production/website-lead-arrived';
  addressEnteredApi = 'https://90oksb1qq9.execute-api.us-west-2.amazonaws.com/production/landing-address-submitted';
  publicWebsite = `https://www.${websiteDomain}`;
  stripePublicKey = 'pk_live_AZq0V7dLw1c3iBlADB9vdyBS';
  googleMapsApiKey = 'AIzaSyClO1qoZxVjVWmdNlNbl4W_XlAluWIb4mQ';
  tawkAPIKey = '5c4c7f0251410568a1086d00';
  env = PRODUCTION;
} else if (process.env.NODE_ENV === STAGING) {
  apiHost = 'https://apidev.ergeon.in';
  websiteDomain = 'ergeon.com';
  blogHost = 'https://blog.ergeon.com';
  fencequotingHost = 'https://fencequoting-staging.firebaseapp.com';
  projectsGalleryHost = 'https://dev.ergeon.com/projects-gallery';
  leadArrivedApi = 'https://8ijvlqff7l.execute-api.us-west-2.amazonaws.com/staging/website-lead-arrived';
  addressEnteredApi = 'https://wvt5gxjul1.execute-api.us-west-2.amazonaws.com/staging/landing-address-submitted';
  publicWebsite = `https://www.${websiteDomain}`;
  googleMapsApiKey = 'AIzaSyCJfEriZ61E_-iggE4PfQd5rs0IRSao2oI';
  stripePublicKey = 'pk_test_dV8nuwF8ciDuX1y0kOCkmzrN';
  tawkAPIKey = '5c4c7f0251410568a1086d00';
  env = STAGING;
} else {
  websiteDomain = 'ergeon.local';
  apiHost = 'http://api.ergeon.local:8000';
  blogHost = 'https://blog.ergeon.com';
  fencequotingHost = 'http://fencequoting.local:8700';
  projectsGalleryHost = 'http://ergeon.local:6500/projects-gallery';
  leadArrivedApi = 'http://localhost:8080/website-lead-arrived';
  addressEnteredApi = 'http://localhost:8080/landing-address-submitted';
  publicWebsite = `http://${websiteDomain}`;
  googleMapsApiKey = 'AIzaSyCJfEriZ61E_-iggE4PfQd5rs0IRSao2oI';
  stripePublicKey = 'pk_test_dV8nuwF8ciDuX1y0kOCkmzrN';
  tawkAPIKey = '5c4c7f0251410568a1086d00';
  env = DEVELOPMENT;
}

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
  publicWebsite,
  stripePublicKey,
  tawkAPIKey,
  websiteDomain,
};
