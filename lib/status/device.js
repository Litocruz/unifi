module.exports = function(hostname, port, site, cookie, mac) {
  var https = require('https'),
      Promise = require('promise'),
      querystring = require('querystring'),
      _ = require('underscore')._;

  var options = {
    maxRedirects: 10,
    followRedirect: true,
    followAllRedirects: true,
    hostname: hostname,
    port: port,
    secureProtocol: 'TLSv1_client_method',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
  };
  var data = querystring.stringify({
    json: JSON.stringify({})
  });

  var promise = new Promise(function(resolve, reject) {
    var req = https.request(_.extend({}, options, {
      path: '/api/s/'+site+'/stat/device',
      method: 'GET',
      headers: {
        'Cookie': cookie
        //'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-Length': Buffer.byteLength(data)
      }
    }), function(res) {
      if (res.statusCode === 200) {
        var str = '';
        res.on('data', function(chunk) {
          str += chunk;
        });
        res.on('end', function() {
          var object = JSON.parse(str);
          resolve(object.data);
        });
      }
      else {
        reject('error - server ' + res.statusCode);
      }
    });

    req.write(data);
    req.end();
  });

  return promise;
};
