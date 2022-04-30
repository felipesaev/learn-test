const config = require('./jest.config.js')

module.exports = {
  ...config,
  testMatch: ['**/?(*.unit.)+(spec|test).[jt]s?(x)']
}