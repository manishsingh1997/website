import {getSessionData} from '@ergeon/erg-utms';

import {init, track, trackTawkEvent} from 'utils/analytics';
import {OFFLINE_FORM_SUBMIT, CHAT_STARTED} from 'utils/events';
import {isPDFMode} from 'utils/utils';

export default function() {
  // <!--Start of Tawk.to Script-->

  (function() {
    let s1=document.createElement('script'), s0=document.getElementsByTagName('script')[0];
    const pdfModeDisabled = !isPDFMode();

    s1.async=true;
    s1.src='https://embed.tawk.to/5c4c7f0251410568a1086d00/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin', '*');

    if (pdfModeDisabled) {
      s0.parentNode.insertBefore(s1, s0);
    }
  })();

  // Attach Tawk events
  const TawkAPI = window['Tawk_API'] = window['Tawk_API'] || {};

  TawkAPI.onLoad = function() {
    getSessionData().then(sessionData => {
      const initialReferrer = sessionData['document']['referrer'];
      TawkAPI.addTags([`Initial referrer: ${initialReferrer}`], () => null);
      trackTawkEvent('UTM Data', {
        source: sessionData['utm']['utm_source'],
        'initial-referrer': initialReferrer,
      });
    });
  };
  TawkAPI.onOfflineSubmit = function(data) {
    track(OFFLINE_FORM_SUBMIT, data);
  };
  TawkAPI.onChatStarted = function(data) {
    track(CHAT_STARTED, data);
  };

  // <!--End of Tawk.to Script-->

  // init link analytics tracking
  init();
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

  let counter = 0;

  document.addEventListener('DOMContentLoaded', function() {
    const hash = document.location.hash;
    if (!hash.length) return;
    let imageSlug = hash.slice(1);
    if (imageSlug && (counter===0)) {
      counter++;
      document.querySelector(`div[gallery-link-id='${imageSlug}']`).click();
    }
  });
}
