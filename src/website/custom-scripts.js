import {tawk} from '@ergeon/erg-utms';

import {init, track} from 'utils/analytics';
import {OFFLINE_FORM_SUBMIT, CHAT_STARTED} from 'utils/events';
import {isPDFMode} from 'utils/utils';

export default function () {
  // <!--Start of Tawk.to Script-->
  const pdfModeDisabled = !isPDFMode();
  if (pdfModeDisabled) {
    tawk.initTawk(process.env.TAWK_API_KEY);
    tawk.tawkAPILoader.then((TawkAPI) => {
      TawkAPI.onOfflineSubmit = function (data) {
        track(OFFLINE_FORM_SUBMIT, data);
      };
      TawkAPI.onChatStarted = function (data) {
        track(CHAT_STARTED, data);
      };
    });
  }
  // <!--End of Tawk.to Script-->

  // init link analytics tracking
  init();
  document.body.addEventListener('click', function (event) {
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

  document.addEventListener('DOMContentLoaded', function () {
    const hash = document.location.hash;
    if (!hash.length) return;
    const imageSlug = hash.slice(1);
    if (imageSlug && counter === 0) {
      counter++;
      const imageLink = document.querySelector(`div[gallery-link-id='${imageSlug}']`);
      imageLink && imageLink.click();
    }
  });
}
