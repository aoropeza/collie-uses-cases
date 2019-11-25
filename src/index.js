const debug = require('debug')('collie:uses-cases');

const usesCases = require('./uses-cases');

module.exports = async config => {
  debug(config);
  return usesCases;
};
