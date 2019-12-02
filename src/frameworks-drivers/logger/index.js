'use strict'

const debug = require('debug')
const bunyan = require('bunyan')
const bunyanFormat = require('bunyan-format')

const formatOut = bunyanFormat({ outputMode: 'json', levelInString: true })

const logger = nameSpace => {
  const dInstance = debug(nameSpace)
  const debugEnabled = dInstance.enabled

  const log = bunyan.createLogger({
    name: nameSpace,
    stream: formatOut,
    levelInString: true
  })

  const debugPrint = (msg, level) => dInstance(`${level}: %O`, msg)

  return {
    info: msg =>
      debugEnabled
        ? debugPrint(msg, 'INFO')
        : log.info({ info: msg, msg: 'dasdas' }),
    debug: msg =>
      debugEnabled ? debugPrint(msg, 'DEBUG') : log.debug({ info: msg }),
    warn: msg =>
      debugEnabled ? debugPrint(msg, 'WARN') : log.war({ info: msg }),
    error: msg => (debugEnabled ? debugPrint(msg, 'ERROR') : log.error(msg)),
    fatal: msg =>
      debugEnabled ? debugPrint(msg, 'FATAL') : log.fatal({ info: msg })
  }
}

module.exports = logger
