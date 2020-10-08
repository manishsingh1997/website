(function(isProd) {
  // Internal app redirection
  const indexOfPath = {
    '/projects-gallery': '/projects-gallery/index.html',
  };
  (function() {
    let pathname, i, path, paths;
    const loadHTML = function(path) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', path, true);
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (this.status !== 200) {
          console.error('Could not load index.html');
          return;
        }
        document.write(this.responseText);
      };
      xhr.send();
    };
    pathname = window.location.pathname;

    paths = Object.keys(indexOfPath);
    for (i=0; i < paths.length; i++) {
      path = paths[i];
      if (pathname.indexOf(path) === 0) {
        loadHTML(indexOfPath[path]);
        break;
      }
    }
  })();
  // End Internal app redirection
  const headElement = document.getElementsByTagName('head')[0];
  const addScript = function(src) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.setAttribute('defer', 'defer');
    headElement.appendChild(script);
  };
  const IS_ERGEON_COM = (function() {
    return document.location.host === 'www.ergeon.com';
  })();
  const AS_PDF = (function() {
    const params = (new URL(document.location)).searchParams;
    const asPDF = params.get('asPDF') || '';
    return asPDF.toLocaleLowerCase() === 'true';
  })();
  window.GTM_KEY = IS_ERGEON_COM ? 'GTM-K83QLN2' : 'GTM-PWDZM7N';
  window.MIXPANEL_KEY = IS_ERGEON_COM ? 'da4d547ba7f43c46612e7354fca68002' : '46b95ea487f0162bc81c864d5a8c9e1c';
  if (!AS_PDF) {
    if (isProd) {
      addScript('/assets/newrelic.js');
    }
    addScript('https://js.stripe.com/v2/');
    addScript('/assets/googletagmanager.js');
    addScript('/assets/mixpanel.js');
  }
})(window.IS_PROD || false);
