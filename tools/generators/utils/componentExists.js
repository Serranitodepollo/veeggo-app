/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../../../src/generators');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}


const pageComponents = fs.readdirSync(path.join(__dirname, '../../../src/generators'));
const pageContainers = fs.readdirSync(path.join(__dirname, '../../../src/generators'));
const components = pageComponents.concat(pageContainers);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
