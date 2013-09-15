(function () {
  var routes;

  routes = {
    '/a': '/assets/partials/a.html',
    '/b': '/assets/partials/b.html',
    '/': '/assets/partials/a.html',
    '': '/assets/partials/notFound.html'
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = routes;
  } else {
    window.routes = routes;
  }
})();