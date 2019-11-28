'use strict'

const { Schema } = require('mongoose')

const Source = Schema({
  ip: {
    required: true,
    type: String
  },
  clientType: {
    required: true,
    type: String
  },
  clientName: {
    required: true,
    type: String
  },
  clientSo: {
    required: true,
    type: String
  },
  clientVersion: {
    required: true,
    type: String
  },
  insertTime: {
    required: true,
    type: Date
  }
})

module.exports = { Source }
