(function (navigator, window, document, libUrl) {
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

  window.onmessage = function () {
    console.log('get the message!');
  };

  // Execute: sending request of tracking client
  loadScript(libUrl, function () {
    var query = 'dt=' + document.title;
    query += '&de=' + document.characterSet;
    query += '&ul=' + navigator.language;
    query += '&sr=' + window.screen.width + 'x' + window.screen.height;
    query += '&vp=' + Math.max(document.documentElement.clientWidth, window.innerWidth || 0) + 'x' +
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    query += '&sd=' + window.screen.colorDepth + '-bit';
    query += '&dl=' + window.location.href;
    query += '&r=' + document.referrer;

    // Tracking
    imgGet('//123.31.11.15:3010/users?' + query, function () {
      // console.log('Tracking sent successfully!');

      var iframe = document.createElement('iframe');
      var body = document.getElementsByTagName('body')[0];
      // iframe.style.display = 'none';
      iframe.src = '//123.31.11.15:3010/iframe';
      var done = false;
      iframe.onreadystatechange = function () {
        if (iframe.readyState !== 'complete' || done) {
          return;
        }
        console.log('Listening');
        var name = iframe.contentWindow.name;
        if (name) {
          console.log('Data: ' + iframe.contentWindow.name);
          done = true;
        }
      };
      body.appendChild(iframe);
    });

    // CORS
    // var req = makeCORSRequest('//123.31.11.15:3010/ajax', 'GET');
    // if (req) {
    //   req.onload = function () {
    //     console.log('CORS onload!');
    //   };
    //   req.send();
    // }

    // Ajax
    // httpGetAsync('//123.31.11.15:3010/ajax', function (data) {
    //   console.log('ajax data: ', data);
    // });
  });
})(navigator, window, document, '//123.31.11.15:3010/javascripts/request.js');
