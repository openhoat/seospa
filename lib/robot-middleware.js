var path = require('path')
  , fs = require('fs')
  , jsdom = require('jsdom')
  , routes = require('../assets/js/routes')
  , config = require('../config')
  , template;

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
    res.render('index', function (err, content) {
      var onLoad, jsDomConfig;
      onLoad = function (errors, window) {
        var document, angular, module, mainContent;
        angular = window.angular;
        document = window.document;
        document.getElementById('main').removeAttribute('ng-view');
        window.scrollTo = function () {
        };
        window.console = console;
        module = angular.module('seospa', []);
        module.config(['$locationProvider', function ($routeProvider, $locationProvider) {
          $locationProvider.html5Mode(true);
        }]);
        angular.bootstrap(document);
        mainContent = document.getElementById('main').innerHTML;
        res.locals.viewContent = mainContent;
        next();
      };
      jsDomConfig = {
        html: content,
        src: [
          fs.readFileSync(path.join(config.assetsDir, 'lib', 'angular', 'angular.min.js'), 'utf-8'),
          fs.readFileSync(path.join(config.assetsDir, 'js', 'controllers', 'HelloCtrl.js'), 'utf-8')
        ],
        done: onLoad
      };
      jsdom.env(jsDomConfig);
    });
  });
};