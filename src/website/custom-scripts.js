/* eslint-disable */
import {init, track} from "utils/analytics";

export default function () {
  // <!--Start of Tawk.to Script-->
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();

  (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/5c4c7f0251410568a1086d00/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
  })();

  var ergeonUtms = null;
  var initial_referrer = null;
  try {
    ergeonUtms = JSON.parse(localStorage.getItem('ergeon-utms'))
    initial_referrer = ergeonUtms["initial_referrer"] || "No referrer";
  }
  catch(error) {
    initial_referrer = "No referrer"
  }
  Tawk_API.onLoad = function(){
    Tawk_API.addTags(["Initial referrer: "+initial_referrer], function(error){});
  };
  // <!--End of Tawk.to Script-->
  // <!-- Start Adding utms to external links -->
  var FENCEQUOTING = 'fencequoting';
  var PROJECTS_GALLERY = 'projects-gallery';
  document.addEventListener('DOMContentLoaded', function() {
    if (ergeonUtms) {
      var query = '?';
      var utmKeys = Object.keys(ergeonUtms);
      utmKeys.map(function(utm) {
        if (utm !== 'savedAt') query += `erg_${utm}=${ergeonUtms[utm]}&`
      });
      if (query.length > 1) {
      query = query.slice(0, -1);
        Array.prototype.forEach.call(document.getElementsByTagName('a'), function(anchor) {
          if (anchor.href.includes(FENCEQUOTING) || anchor.href.includes(PROJECTS_GALLERY)) {
            var changeLocation = (e) => {
              e.preventDefault();
              window.location.href = anchor.href+=query;
            }
            anchor.addEventListener('click', changeLocation);
          }
        })
      }
    }
  }, false);
  // <!-- End Adding utms to external links -->


  // init link analytics tracking
  init();
  document.body.addEventListener('click', function(event) {
    const link = event.target;
    if(link.hasAttribute('data-track-link')) {
      track('click', {
        type: 'link',
        body: link.innerText,
        link: link.getAttribute('href'),
      });
    }
  });

  // Attach Tawk events
  Tawk_API.onOfflineSubmit = function(data) {
    track(OFFLINE_FORM_SUBMIT, data);
  };
  Tawk_API.onChatStarted = function(data) {
    track(CHAT_STARTED, data);
  };

  let initialSlug = null;
  let counter = 0;
  function handleClick(slug) {
    initialSlug = slug;
  }

  document.addEventListener('DOMContentLoaded', function(){
    const hash = document.location.hash;
    if(!hash.length) return;
    let imageSlug = hash.slice(1);
    if (imageSlug && (counter===0)) {
      counter++;
      document.querySelector("div[gallery-link-id='"+imageSlug+"']").click();
    }
  });
};
