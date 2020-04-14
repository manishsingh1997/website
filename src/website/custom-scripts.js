import {init, track} from 'utils/analytics';
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

  let ergeonUtms = null;
  let initialReferrer = null;
  try {
    ergeonUtms = JSON.parse(localStorage.getItem('ergeon-utms'));
    initialReferrer = ergeonUtms['initial_referrer'] || 'No referrer';
  } catch (error) {
    initialReferrer = 'No referrer';
  }

  // Attach Tawk events
  const TawkAPI = window['Tawk_API'] = window['Tawk_API'] || {};

  TawkAPI.onLoad = function() {
    TawkAPI.addTags([`Initial referrer: ${initialReferrer}`], () => null);
  };
  TawkAPI.onOfflineSubmit = function(data) {
    track(OFFLINE_FORM_SUBMIT, data);
  };
  TawkAPI.onChatStarted = function(data) {
    track(CHAT_STARTED, data);
  };

  // <!--End of Tawk.to Script-->
  // <!-- Start Adding utms to external links -->
  let FENCEQUOTING = 'fencequoting';
  let PROJECTS_GALLERY = 'projects-gallery';
  document.addEventListener('DOMContentLoaded', function() {
    if (ergeonUtms) {
      let query = '?';
      let utmKeys = Object.keys(ergeonUtms);
      utmKeys.forEach(function(utm) {
        if (utm !== 'savedAt') query += `erg_${utm}=${ergeonUtms[utm]}&`;
      });
      if (query.length > 1) {
        query = query.slice(0, -1);
        Array.prototype.forEach.call(document.getElementsByTagName('a'), function(anchor) {
          if (anchor.href.includes(FENCEQUOTING) || anchor.href.includes(PROJECTS_GALLERY)) {
            let changeLocation = (e) => {
              e.preventDefault();
              window.location.href = anchor.href+=query;
            };
            anchor.addEventListener('click', changeLocation);
          }
        });
      }
    }
  }, false);
  // <!-- End Adding utms to external links -->

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
