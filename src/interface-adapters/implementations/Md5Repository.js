/* eslint-disable class-methods-use-this */

'use strict'

const crypto = require('crypto')

const { Md5 } = require('../interfaces/Md5')

class Md5Repository extends Md5 {
  exec(value) {
    return crypto
      .createHash('md5')
      .update(value)
      .digest('hex')
  }
}

module.exports = { Md5Repository }
