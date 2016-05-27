(function (libUrl) {
  /**
   * Load script from url
   * @param url
   * @param callback
   */
  function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {  // For IE
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  // Other browsers
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  // Execute: sending request of tracking client
  loadScript(libUrl, function () {
    // Fingerprint
    var ec = new evercookie({
      baseurl: '/bower_components/evercookie',
      asseturi: '/assets',
      phpuri: '/php'
    });
    new Fingerprint2().get(function (result, components) {
      (new Image()).src = '//123.31.11.15:3010/users?fp=' + result;
      console.log('fp: ', result);
      ec.set('fp', result);
    });
  });
})('//123.31.11.15:3010/tracking.js');
