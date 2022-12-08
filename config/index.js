// This config file exists to handle the configuration of logging of the service registry events
// as well configuration options for the different environments: dev, production, and test

const bunyan = require('bunyan');
// Load package.json
const pjs = require('../package.json');

// Get some meta info from the package.json
const { name, version } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

// Configuration options for different environments
module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 24 * 3600,
    draw: 'http://localhost:3095',
    seller: `http://localhost:3090`,
    tickets: 'http:localhost:3060',
    log: () => getLogger(name, version, 'debug'),
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    draw: 'http://localhost:3085',
    seller: `http://localhost:3090`,
    tickets: 'http:localhost:3060',
    log:  () => getLogger(name, version, 'info'),
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    draw: 'http://localhost:3085',
    seller: `http://localhost:3090`,
    tickets: 'http:localhost:3060',
    log: () => getLogger(name, version, 'fatal'),
  },
};
