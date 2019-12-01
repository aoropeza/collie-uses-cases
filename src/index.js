'use strict'

const logger = require('./frameworks-drivers/logger')('collie:uses-cases')
const { DbConnector } = require('./frameworks-drivers/db/DbConnector')
const { Controllers } = require('./interface-adapters/controllers')

class UsesCases {
  static async buildStatic(config) {
    logger.info(config)

    if (!UsesCases.dbConnector) {
      logger.info('Initializing database')
      UsesCases.dbConnector = new DbConnector(config)
      await UsesCases.dbConnector.connect()
    } else {
      logger.info('Database already initialized')
    }
    return Controllers
  }
}

module.exports = { UsesCases }
