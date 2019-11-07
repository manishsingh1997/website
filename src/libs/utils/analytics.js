/* eslint-disable */
import cookies from 'js-cookie';
import ls from 'local-storage';
import Raven from 'raven-js';
import UAparser from 'ua-parser-js';
import isPlainObject from 'is-plain-object';
import cleanDeep from 'clean-deep';

const MILLISECONDS_IN_MONTH = 2592000000;

import {UUID_COOKIE_NAME, isProduction} from 'libs/constants';
import config from 'libs/config';
import {
  getParameterByName,
  isObject,
} from 'libs/utils/utils';

export const LS_KEY = 'ergeon-utms';

export const guid = () => {
  const s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const getUserUuid = () => {
  let uuid;

  try {
    uuid = cookies.get(UUID_COOKIE_NAME) || guid();
    cookies.set(UUID_COOKIE_NAME, uuid, {expires: 365});
  } catch (e) {
    trackError(e);
    uuid = guid();
  }

  return uuid;
};

export const track = (eventName, data) => {
  // BEGIN: Google Tag manager
  const dataLayer = window.dataLayer;

  if (!dataLayer) {
    trackError('No GTM');
  }
  try {
    dataLayer.push({
      event: eventName,
      data: {
        ...data,
        uuid: getUserUuid(),
        anonymousId: getUserUuid(),
      },
    });
  } catch (e) {
    trackError(e);
  }
  // END: Google Tag manager

  if (!isProduction) {
    console.log(`%cEvent %c ${eventName}`,
      'color: #FF8118; font-size:24px;',
      'color: #00B9F3; font-size:24px;',
      data);
  }
};

const campaignParams = (params) => {
  const campaignKeywords =
    'utm_source utm_medium utm_campaign utm_content utm_term utm_adset utm_ad referred rc source ref'.split(' ');
  let kw = '';
  let index;

  for (index = 0; index < campaignKeywords.length; ++index) {
    kw = getParameterByName(campaignKeywords[index]);
    if (kw && kw.length) {
      params[campaignKeywords[index]] = kw;
    }
  }
  params['document_referrer'] = document.referrer || 'No referrer';
  return params;
};

export const identify = (_gidOrTraits, _traits) => {
  const mixpanel = window.mixpanel;

  if (!mixpanel) {
    trackError('No Mixpanel');
  }

  let gid;
  let traits;

  if (isObject(_gidOrTraits)) {
    gid = null;
    traits = _gidOrTraits;
  } else {
    gid = _gidOrTraits;
    traits = _traits;
  }

  traits = campaignParams(traits || {});

  if (document.referrer) {
    traits.referrer = document.referrer;
  }

  try {
    if (gid) {
      mixpanel.alias(gid);
      mixpanel.identify(gid, traits, {
        anonymousId: getUserUuid(),
      });
    } else {
      mixpanel.identify(traits, {
        anonymousId: getUserUuid(),
      });
    }
  } catch (e) {
    trackError(e);
  }

  try {
    Raven.setUserContext({
      ...traits,
      uuid: getUserUuid(),
    });
  } catch (e) {
    trackError(e);
  }
};

export const trackError = (error, data) => {
  Raven.captureException(error, data);
  console.log(error && error.stack || error, data && data.stack);
};

export const page = () => {
  const mixpanel = window.mixpanel;

  if (!mixpanel) {
    trackError('No Mixpanel');
  }

  try {
    mixpanel.track('Loaded a Page', {
      uuid: getUserUuid(),
      path: window.location.pathname,
      title: document.title,
    });
  } catch (e) {
    trackError(e);
  }

  if (!isProduction) {
    console.log(`%cPage %c ${window.location.pathname}`,
      'color: #FF8118; font-size:24px;',
      'color: #00B9F3; font-size:24px;');
  }
};

export const cacheUTM = () => {
  let current = {};
  const saved = getUTM();

  campaignParams(current);
  const savedPrint = saved.utm_source + saved.utm_medium + saved.utm_campaign + saved.utm_content;

  // if new utm params came, keep the first
  if (savedPrint) {
    current = saved;
  } else {
    current = {
      ...current,
      savedAt: Date.now(),
    };
  }

  const initial_referrer = document.referrer || 'No referrer';
  current.initial_referrer = saved.initial_referrer === undefined ? initial_referrer : saved.initial_referrer;
  current.initial_landing_page = saved.initial_landing_page === undefined ?
    window.location.href :
    saved.initial_landing_page;

  const referrerSourcesKeywords = [{keyword: "advisor", label: "Lead - Home Advisor"},
    {keyword: "yelp", label: "Lead - Yelp"},
    {keyword: "google", label: "Lead - Google"},
    {keyword: "facebook", label: "Lead - Facebook Page"}];
  let index;
  for (index = 0; index < referrerSourcesKeywords.length; ++index) {
    if (initial_referrer.includes(referrerSourcesKeywords[index].keyword)) {
      current.utm_source = referrerSourcesKeywords[index].label;
    }
  }
  try {
    ls.set(LS_KEY, current);
  } catch (e) {}
  return current;
};

export const getUTM = () => {
  let current;
  try {
    current = ls.get(LS_KEY) || {};
    if (current && current.savedAt &&
      Date.now() - current.savedAt > MILLISECONDS_IN_MONTH || !current) {
      current = {};
    }
  } catch (e) {
    current = {};
  }
  return current;
};

export const init = () => {
  if (config.sentryDSN) {
    Raven.config(config.sentryDSN).install();
  }
  cacheUTM();
  identify(getUserUuid());
  page();
};

export const getUserAgent = () => {
  const ua = UAparser(window.navigator.userAgent);
  const res = {};
  for (const key in ua) {
    if (isPlainObject(ua[key])) {
      for (const deepKey in ua[key]) {
        if (ua[key][deepKey]) {
          res[`${key}_${deepKey}`] = ua[key][deepKey];
        }
      }
    } else if (ua[key]) {
      res[key] = ua[key];
    }
  }
  return cleanDeep(res);
};
