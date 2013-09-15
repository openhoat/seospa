var http = require('http')
  , express = require('express')
  , ejs = require('ejs')
  , lessMiddleware = require('less-middleware')
  , config = require('./config')
  , app;

app = express();
app.set('port', config.listenPort);
app.set('views', config.viewsDir);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(app.router);
app.use(lessMiddleware(config.less));
app.use('/assets', express.static(config.assetsDir));
app.use(express.errorHandler());
app.use(function (req, res, next) {
  res.render('index');
});

app.listen(config.listenPort, function () {
  console.log('Http server listening on port', config.listenPort);
});
