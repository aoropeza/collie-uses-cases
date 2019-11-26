'use strict'

const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema

const Brand = Schema({
  id: ObjectId,
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
