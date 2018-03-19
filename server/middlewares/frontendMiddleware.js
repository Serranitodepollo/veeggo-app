/* eslint-disable global-require */

/**
 * Front-end middleware
 */

function frontendMiddleware(app, options) {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../tools/webpack/webpack.dev');
    const addDevMiddlewares = require('./addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
}

module.exports = frontendMiddleware;
