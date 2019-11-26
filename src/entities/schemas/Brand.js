'use strict'

const mongoose = require('mongoose')

const { Schema } = mongoose

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
