const shell = require('shelljs');
const path = require('path');
const fs = require('fs-extra');
const defaults = require('lodash/defaultsDeep');
const pkg = require('../../package.json');
const { dllPlugin } = require('../config');

// No need to build the DLL in production
if (process.env.NODE_ENV === 'production') {
  process.exit(0);
}

const exists = fs.existsSync;
const writeFile = fs.writeFileSync;
const dllConfig = defaults(pkg.dllPlugin, dllPlugin.defaults);
const outputPath = path.join(process.cwd(), dllConfig.path);
const dllManifestPath = path.join(outputPath, 'package.json');

/**
 * I use node_modules/react-dlls by default just because
 * it isn't going to be version controlled and babel wont try to parse it.
 */
shell.mkdir('-p', outputPath);

shell.echo('Building the Webpack DLL...');

/**
 * Create a manifest so npm install doesn't warn us
 */
if (!exists(dllManifestPath)) {
  writeFile(
    dllManifestPath,
    JSON.stringify(defaults({
      name: 'react-dlls',
      private: true,
      author: pkg.author,
      repository: pkg.repository,
      version: pkg.version,
    }), null, 2),
    'utf8',
  );
}

// the BUILDING_DLL env var is set to avoid confusing the development environment
shell.exec('cross-env BUILDING_DLL=true webpack --display-chunks --color --config tools/webpack/webpack.dll.js --hide-modules');
