const mongoose = require('mongoose')

const logger = require('../logger')('collie:uses-cases:db')

const db = config => {
  const mongoUrl = `${config.uriConnection.protocol}://${config.uriConnection.user}:${config.uriConnection.password}@${config.uriConnection.host}/${config.uriConnection.database}?retryWrites=true&w=majority`
  logger.info(`Connecting to: ${mongoUrl}`)
  return mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (err) {
        logger.error(err)
        throw new Error(err)
      }
    }
  )
}

module.exports = db
