(function (libUrl) {
  // Load script from url
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
      // Current fingerprint
      console.log('fp: ', result);

      var url = '//manhhailua.com:3010/users?fp=' + result;

      // Evercookie checking
      ec.get('fp', function (fp) {
        console.log('from evercookie: ', fp);
        if (result !== fp) { // Detect change of fingerprint
          // Save new fingerprint
          console.log('Your fingerprint has changed!');
          ec.set('fp', result); // Save fingerprint
          console.log('Your new fingerprint has been saved!');

          // Add old fingerprint to url
          url += '&ofp=' + fp;
        }
        (new Image()).src = url; // Make request
      })
    });
  });
})('http://manhhailua.com:3010/tracking.js');
