var login = require('../lib/commands/login'),
    reboot = require('../lib/commands/reboot'),
    device = require('../lib/status/device');

var host = 'unifi.um.edu.ar',
    port = '8443',
    username = 'admin',
    password = 'qmzp1029';
    site = 'default';

exports.getAllAps = function(req, res){
  login(host, port, username, password)
    .then(function(cookie) {
      return device(host, port, site, cookie);
    })
    .then(function(devices) {
        return res.send(devices);
    });
}
exports.findByMac = function(req, res){
  login(host, port, username, password)
    .then(function(cookie) {
      return device(host, port, site, cookie);
    })
    .then(function(devices) {
      devices.forEach(function(ap) {
        if (ap.mac == req.param('mac')) {
          return res.send(ap);
        }
      })
    });
}
exports.restartAp = function(req, res){
  login(host, port, username, password)
    .then(function(cookie) {
      return reboot(host, port, site, cookie, req.param('mac'));
    })
  .then(function() {
    //res.write("OK");
    var response = {'mac' : req.param('mac')}
    res.send(response);
    console.log('AP: ' + response.mac+' arguments' +JSON.stringify(arguments)+' reiniciando...');
    //JSON.stringify(arguments)
  });
}
