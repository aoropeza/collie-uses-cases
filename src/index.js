'use strict'

const logger = require('./logger')('collie:uses-cases')
const db = require('./db')
const usesCases = require('./uses-cases')

module.exports = async config => {
  logger.info(config)
  await db(config)
  return usesCases
}
