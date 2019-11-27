'use strict'

const logger = require('./lib/logger')('collie:uses-cases')
const db = require('./lib/db')
const usesCases = require('./uses-cases')

module.exports = async config => {
  logger.info(config)
  await db(config)
  return usesCases
}
