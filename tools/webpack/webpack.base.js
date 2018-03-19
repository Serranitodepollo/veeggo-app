/**
 * COMMON WEBPACK CONFIGURATION
 */

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
// const cssNext = require('postcss-cssnext');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssGlobalImport = require('postcss-global-import');
const postcssCustomMedia = require('postcss-custom-media');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssNested = require('postcss-nested');

const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const reFonts = /\.(eot|ttf|otf|woff|woff2)$/;
const reVideo = /\.(mp4|webm)$/;
const reHtml = /\.html$/;

const webpackBase = options => ({
  mode: options.mode || 'development',

  context: path.resolve(process.cwd()),

  entry: options.entry,

  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },

  devtool: options.devtool,

  target: 'web', // Make web variables accessible to webpack, e.g. window

  performance: options.performance || {},

  optimization: optimizationHandlers(options.optimization),

  module: {
    strictExportPresence: true,

    rules: [
      {
        test: reScript, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: reStyle,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
                localIdentName: options.cssQuery.cssModuleName,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  postcssImport({
                    addDependencyTo: webpack,
                    path: path.resolve(process.cwd(), 'src'),
                    addModulesDirectories: [path.resolve(process.cwd(), 'src/styles')],
                  }),
                  postcssGlobalImport,
                  postcssCustomMedia({
                    preserve: true,
                  }),
                  postcssFlexbugsFixes,
                  postcssNested,
                  // cssNext({
                  //   browsers: ['last 2 versions', '> 5%'],
                  // }),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'true',
                  }),
                ],
              },
            },
          ],
        }),
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: reStyle,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: reFonts,
        use: 'file-loader',
      },
      {
        test: reImage,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: reHtml,
        use: 'html-loader',
      },
      {
        test: reVideo,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },

  plugins: options.plugins.concat([
    new ExtractTextPlugin({
      filename: options.cssQuery.cssFilename,
      allChunks: true,
    }),

    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]),

});

module.exports = webpackBase;


/**
 * Select which optimization to use to optimize the bundle's handling of
 * third party dependencies.
 */

function optimizationHandlers(options = {}) {
  const query = {
    minimize: false,
  };

  if (!options.dllPlugin) {
    query.runtimeChunk = {
      name: 'vendor',
    };

    query.splitChunks = {
      cacheGroups: {
        default: false,
        commons: {
          // test: /node_modules/,
          name: 'vendor',
          // chunks: 'initial',
          // children: true,
          minSize: 2,
          // async: true,
        },
      },
    };
  }

  if (options.production) {
    query.minimize = true;
  }

  return query;
}
