const path = require('path');
const { pullAll, uniq } = require('lodash');

const DEFAULT_LOCALE = 'en';

const dllPlugin = {
  defaults: {
    /**
     * we need to exclude dependencies which are not intended for the browser
     * by listing them here.
     */
    exclude: [
      'chalk',
      'compression',
      'cross-env',
      'express',
      'ip',
      'minimist',
      'sanitize.css',
    ],

    /**
     * Specify any additional dependencies here. We include core-js and lodash
     * since a lot of our dependencies depend on them and they get picked up by webpack.
     */
    include: ['core-js', 'eventsource-polyfill', 'babel-polyfill', 'lodash'],

    // The path where the DLL manifest and bundle will get built
    path: `${path.resolve(process.cwd(), 'node_modules')}/react-dlls`,
  },

  entry(pkg) {
    const dependencyNames = Object.keys(pkg.dependencies);
    const exclude = pkg.dllPlugin.exclude || dllPlugin.defaults.exclude;
    const include = pkg.dllPlugin.include || dllPlugin.defaults.include;
    const includeDependencies = uniq(dependencyNames.concat(include));

    return {
      reactDeps: pullAll(includeDependencies, exclude),
    };
  },
};

module.exports = {
  DEFAULT_LOCALE,
  dllPlugin,
};
