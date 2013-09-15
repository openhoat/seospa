var fs = require('fs')
  , routes = require('../assets/js/routes')
  , config = require('../config');

module.exports = function (req, res, next) {
  var ua, template;
  res.locals.viewContent = null;
  ua = req.headers['user-agent'];
  if (!ua.match(/bot/i)) {
    return next();
  }
  template = routes[req.path] || routes[''];
  fs.readFile(config.baseDir + template, 'utf-8', function (err, data) {
    if (err) {
      console.error(err.stack);
      res.send(500, 'Something broke!');
      return;
    }
    res.locals.viewContent = data;
    next();
  });
};