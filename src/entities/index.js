'use strict'

const mongoose = require('mongoose')

const Schemas = require('./schemas')

const buildMakeEntity = model => {
  return mongoose.model(model, Schemas[model])
}

module.exports = {
  Brand: buildMakeEntity('Brand')
}
