'use strict'

const mongoose = require('mongoose')

const Schemas = require('../lib/schemas')

const buildMakeEntity = model => {
  return mongoose.model(model, Schemas[model])
}

module.exports = {
  Brand: buildMakeEntity('Brand'),
  Location: buildMakeEntity('Location')
}
