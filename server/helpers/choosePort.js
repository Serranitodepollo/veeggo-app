const isRoot = require('is-root');
const detect = require('detect-port-alt');
const chalk = require('chalk');
const inquirer = require('inquirer');
const getProcessForPort = require('./getProcessForPort');

function choosePort(host, defaultPort) {
  return detect(defaultPort, host).then(
    port =>
      new Promise((resolve) => {
        if (port === defaultPort) {
          return resolve(port);
        }

        const existingProcess = getProcessForPort(defaultPort);
        if (existingProcess) {
          resolve(port);
        } else {
          resolve(null);
        }
        return true;
      }),
    (err) => {
      throw new Error(`${chalk.red(`Could not find an open port at ${chalk.bold(host)}.`)} \n ('Network error message: ${err.message} || err)\n`);
    },
  );
}

module.exports = choosePort;
