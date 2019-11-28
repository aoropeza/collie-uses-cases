'use strict'

const mongoose = require('mongoose')

const Schemas = require('../lib/schemas')

const buildMakeEntity = model => {
  return mongoose.model(model, Schemas[model])
}

module.exports = {
  Source: buildMakeEntity('Source'),
  Brand: buildMakeEntity('Brand'),
  Location: buildMakeEntity('Location'),
  Movie: buildMakeEntity('Movie'),
  Schedule: buildMakeEntity('Schedule')
}
