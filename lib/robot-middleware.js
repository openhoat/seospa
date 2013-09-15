var phantom = require('phantom')
  , ph;

phantom.create(function (phantomPh) {
  ph = phantomPh;
});

module.exports = function (req, res, next) {
  var ua;
  res.locals.viewContent = null;
  ua = req.headers['user-agent'];
  if (!ua.match(/bot/i)) {
    return next();
  }
  ph.createPage(function (page) {
    page.set('onConsoleMessage', function (msg) {
      var data;
      try {
        data = JSON.parse(msg);
      } catch (err) {
      }
      if (data && data.mainContent) {
        res.locals.viewContent = data.mainContent;
        page.close();
        next();
      } else {
        console.log('log from phantom :', msg);
      }
    });
    page.open('http://localhost:3000' + req.path, function (status) {
      page.evaluate(function () {
        var mainElt, mainContent;
        mainElt = document.getElementById('main');
        mainContent = mainElt && mainElt.innerHTML;
        mainContent = mainContent || '';
        console.log(JSON.stringify({ mainContent: mainContent }));
      });
    });
  });
};