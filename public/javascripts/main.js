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
      baseurl: '//codek.org',
      asseturi: '/assets',
      phpuri: '/php'
    });

    // Evercookie checking
    ec.get('guid', function (guid) {
      if (!guid) {
        console.log('No GUID found in evercookie! We now create one for you!');
        var uuid = TRequest.guid();
        console.log('Your GUID: ', uuid);
        ec.set('guid', uuid);
        console.log('Your GUID has been successfully stored in evercookie!');
      } else {
        console.log('GUID from evercookie: ', guid);
      }
    });

    new Fingerprint2().get(function (result, components) {
      console.log('fp: ', result); // Current fingerprint
      if (document.getElementsByName('fingerPrint')[0]) {
        document.getElementsByName('fingerPrint')[0].value = result;
      }
      TRequest.imgGet('//manhhailua.com/users?fp=' + result, function () {
        console.log('Tracking request has sent with fingerprint: ', result);
      });
    });
  });
})('//manhhailua.com/tracking.js');
