import {tawk} from '@ergeon/erg-utms';

import {init, track} from 'utils/analytics';
import {OFFLINE_FORM_SUBMIT, CHAT_STARTED} from 'utils/events';
import {isPDFMode} from 'utils/utils';
import config from 'website/config';

export default function() {
  if (isPDFMode() || window.IS_INTERNAL_REDIRECT) {
    return;
  }
  init();
  // start of Tawk.to init
  tawk.initTawk(config.tawkAPIKey);
  tawk.tawkAPILoader.then(TawkAPI => {
    TawkAPI.onOfflineSubmit = function(data) {
      track(OFFLINE_FORM_SUBMIT, data);
    };
    TawkAPI.onChatStarted = function(data) {
      track(CHAT_STARTED, data);
    };
  });
  // end of Tawk.to init
  // init link analytics tracking
  document.body.addEventListener('click', function(event) {
    const link = event.target;
    if (link.hasAttribute('data-track-link')) {
      track('click', {
        type: 'link',
        body: link.innerText,
        link: link.getAttribute('href'),
      });
    }
  });
  // end of link analytics tracking
  // Gallery link redirection
  document.addEventListener('DOMContentLoaded', function() {
    const hash = document.location.hash;
    if (!hash.length) return;
    const imageSlug = hash.slice(1);
    if (imageSlug) {
      const imageLink = document.querySelector(`div[gallery-link-id='${imageSlug}']`);
      if (imageLink) {
        imageLink.click();
      }
    }
  }, {'once': true});
// End Gallery link redirection
}
