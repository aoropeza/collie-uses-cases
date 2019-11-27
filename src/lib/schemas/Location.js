'use strict'

const { Schema } = require('mongoose')

const Location = Schema({
  brand: { required: true, type: Schema.Types.ObjectId, ref: 'Brand' },
  name: {
    required: true,
    type: String
  },
  latitude: {
    required: true,
    type: Number
  },
  longitude: {
    required: true,
    type: Number
  },
  address: {
    required: true,
    type: String
  }
})

module.exports = { Location }
