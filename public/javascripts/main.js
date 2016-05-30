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
      baseurl: 'http://codek.org',
      asseturi: '/assets',
      phpuri: '/php'
    });
    new Fingerprint2().get(function (result, components) {
      (new Image()).src = '//manhhailua.com:3010/users?fp=' + result;
      // Current fingerprint
      console.log('fp: ', result);

      // Evercookie checking
      ec.get('fp', function (fp) {
        console.log('from evercookie: ', fp);
        if (result !== fp) { // Detect change of fingerprint
          console.log('Your fingerprint has changed!');
          ec.set('fp', result); // Save fingerprint
          console.log('Your new fingerprint has been saved!');
        }
      })
    });
  });
})('//manhhailua.com:3010/tracking.js');
