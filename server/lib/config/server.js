const path = require('path');

const staticFolder = path.join(`${__dirname}/../../../client`);

module.exports = {
  httpPort: 8080,
  staticFolder,
};
