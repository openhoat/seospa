(function () {
  var module;

  console.log('module init');
  module = angular.module('seospa', []);
  module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    var key, route;
    for (key in routes) {
      route = routes[key];
      if (key === '') {
        $routeProvider.otherwise({ templateUrl: route });
      } else {
        $routeProvider.when(key, { templateUrl: route })
      }
    }
    $locationProvider.html5Mode(true);
  }]);

  angular.bootstrap(document);
})();
