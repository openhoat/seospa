var path = require('path')
  , baseDir = __dirname
  , config;

config = {
  listenPort: 3000,
  baseDir: baseDir,
  viewsDir: path.join(baseDir, 'views'),
  assetsDir: path.join(baseDir, 'assets'),
  less: {
    src: path.join(baseDir, 'less'),
    prefix: '/assets/styles',
    once: false,
    compress: true,
    optimization: 2
  }
};
config.less.dest = path.join(config.baseDir, config.less.prefix);

module.exports = config;