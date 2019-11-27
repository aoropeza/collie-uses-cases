'use strict'

const { Schema } = require('mongoose')

const Brand = Schema({
  name: {
    required: true,
    type: String
  },
  logo: {
    required: true,
    type: String
  }
})

module.exports = { Brand }
