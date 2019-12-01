'use strict'

const mongoose = require('mongoose')

const logger = require('../logger')('collie:uses-cases:db')

class DbConnector {
  constructor(config) {
    this._config = config
  }

  connect() {
    const mongoUrl = `${this._config.uriConnection.protocol}://${this._config.uriConnection.user}:${this._config.uriConnection.password}@${this._config.uriConnection.host}/${this._config.uriConnection.database}?retryWrites=true&w=majority`
    logger.info(`Connecting to: ${mongoUrl}`)
    return mongoose.connect(
      mongoUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      },
      err => {
        if (err) {
          logger.error(err)
          throw new Error(err)
        }
      }
    )
  }
}

module.exports = { DbConnector }
