'use strict'

const { Schema } = require('mongoose')

const Movie = Schema({
  name: {
    require: true,
    type: String
  },
  computedUnique: {
    required: true,
    type: String
  }
})

module.exports = { Movie }
