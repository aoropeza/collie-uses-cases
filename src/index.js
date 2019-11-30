'use strict'

const logger = require('./frameworks-drivers/logger')('collie:uses-cases')
const db = require('./frameworks-drivers/db')
const controllers = require('./interface-adapters/controllers')

module.exports = async config => {
  logger.info(config)
  await db(config)
  return controllers
}
