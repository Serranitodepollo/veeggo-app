/* eslint-disable */
const exec = require('child_process').exec;
const pkg = require('../../package.json');

exec('npm -v', (err, stdout) => {
  if (err) throw err;
  if (parseFloat(stdout) < pkg.engines.npm.match(/(\d+\.?)+/)[0]) {
    throw new Error(`[ERROR: React Boilerplate] You need npm version @${pkg.engines.npm}`);
    // process.exit(1);
  }
});
