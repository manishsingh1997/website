import * as Sentry from '@sentry/browser';

import {getBaseEventData, getVisitorId, getCurrentData, tawk} from '@ergeon/erg-utms';
import {DEFAULT_SOURCE_VALUE} from 'website/constants';
import {isObject} from 'utils/utils';
import {submitAddressEntered} from 'api/lead';
import {CUSTOMER_LEAD_CREATED, ADDRESS_ENTERED} from 'utils/events';
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';

export const track = (eventName, data) => {
  // BEGIN: Google Tag manager
  const dataLayer = window.dataLayer;

  if (!dataLayer) {
    trackError('No GTM');
  }
  getVisitorId()
    .then(visitorId => {
      dataLayer.push({
        event: eventName,
        data: {
          ...data,
          uuid: visitorId,
          anonymousId: visitorId,
        },
      });
    })
    .catch(e => {
      trackError(e);
    });
  // END: Google Tag manager

  if (process.env.NODE_ENV !== 'production') {
    console.log(`%cEvent %c ${eventName}`, // eslint-disable-line
      'color: #FF8118; font-size:24px;',
      'color: #00B9F3; font-size:24px;',
      data);
  }
};

const addCampaignParams = (params) => {
  const currentData = getCurrentData();
  return {...params, ...currentData['utm'], ...currentData['document']};
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

  traits = addCampaignParams(traits || {});

  if (document.referrer) {
    traits.referrer = document.referrer;
  }

  getVisitorId()
    .then(visitorId => {
      if (gid) {
        mixpanel.alias(gid);
        mixpanel.identify(gid, traits, {
          anonymousId: visitorId,
        });
      } else {
        mixpanel.identify(traits, {
          anonymousId: visitorId,
        });
      }
    })
    .catch(e => {
      trackError(e);
    });

  getVisitorId()
    .then(visitorId => {
      Sentry.configureScope(scope => {
        scope.setUser({
          ...traits,
          uuid: visitorId,
        });
      });
    })
    .catch(e => {
      trackError(e);
    });
};

export const trackError = (error, data) => {
  Sentry.withScope(scope => {
    scope.setExtra('data', data);
    Sentry.captureException(error);
  });
  console.error(error && error.stack || error, data && data.stack);
};

export const page = () => {
  const mixpanel = window.mixpanel;

  if (!mixpanel) {
    trackError('No Mixpanel');
  }

  getVisitorId()
    .then(visitorId => {
      mixpanel.track('Loaded a Page', {
        uuid: visitorId,
        path: window.location.pathname,
        title: document.title,
      });
    })
    .catch(e => {
      trackError(e);
    });

  if (process.env.NODE_ENV !== 'production') {
    console.log(`%cPage %c ${window.location.pathname}`, // eslint-disable-line
      'color: #FF8118; font-size:24px;',
      'color: #00B9F3; font-size:24px;');
  }
};

export const init = () => {
  getVisitorId().then(visitorId => {
    identify(visitorId);
    page();
  });
};

export const trackAddressEntered = (lead) => {
  const address = lead.address;
  const enteredAddressData = {};
  enteredAddressData['formatted_address'] = address.formatted_address;
  enteredAddressData['place_types'] = address.place_types;
  enteredAddressData['raw_address'] = address.raw_address;
  enteredAddressData['zip_code'] = address.zipcode;
  enteredAddressData['address1'] = `${address.primary_number} ${address.street_name}`;
  enteredAddressData['city'] = address.city_name;
  if (typeof address.location.lat === 'function') {
    enteredAddressData['location'] = {
      lat: address.location.lat(),
      lng: address.location.lng(),
    };
  } else {
    enteredAddressData['location'] = {
      lat: address.location? address.location.lat : null,
      lng: address.location? address.location.lng : null,
    };
  }
  enteredAddressData['state'] = address.state_abbreviation;
  enteredAddressData['product_slug'] = lead['product_slug'];

  tawk.trackTawkEvent(ADDRESS_ENTERED, {address: address.formatted_address});

  getBaseEventData().then((baseEventData) => {
    const eventData = {...baseEventData, ...enteredAddressData};

    track(ADDRESS_ENTERED, {
      ...eventData['object']['initial_params'],
      address,
      source: DEFAULT_SOURCE_VALUE,
    });

    // submit the event
    submitAddressEntered(eventData);
    Sentry.addBreadcrumb({
      message: 'Address submit',
      category: 'action',
      data: eventData,
    });
  });
};

export const trackTawkLeadEvent = (submitData) => {
  return tawk.tawkAPILoader.then(TawkAPI => {
    TawkAPI.setAttributes({
      email: submitData.email,
      name: submitData.name,
    });

    let data = {
      address: submitData.address && submitData.address['formatted_address'],
      email: submitData.email,
      name: submitData.name,
    };

    if (submitData.product === FENCE_SLUG) {
      data = {
        ...data,
        ...submitData.object.order.reduce((res, config, index) => {
          res[`config-${index}`] = config.description;
          return res;
        }, {}),
      };
    }

    return tawk.trackTawkEvent(CUSTOMER_LEAD_CREATED, data);
  });
};
