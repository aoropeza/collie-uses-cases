'use strict'

const { Schema } = require('mongoose')

const Schedule = Schema({
  movie: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  },
  startTime: {
    required: true,
    type: Date
  },
  duration: {
    required: true,
    type: Number
  },
  typeRoom: {
    required: true,
    type: String
  },
  computedUnique: {
    required: true,
    type: String
  }
})

module.exports = { Schedule }
