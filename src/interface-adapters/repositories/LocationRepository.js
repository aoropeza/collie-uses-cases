/* eslint-disable class-methods-use-this */

'use strict'

const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const { Location } = require('../../entities/models')
const { DbStrategy } = require('../strategies/DbStrategy')

class LocationRepository extends DbStrategy {
  constructor() {
    super()
    this._schema = mongoose.Schema({
      ...Location.schema,
      brand: { type: Schema.Types.ObjectId }
    })
    this._model = mongoose.model(Location.persistName, this._schema)
  }

  async validate(properties) {
    const ModelLocation = this._model
    const source = new ModelLocation(properties)

    await source.validateSync()
  }

  async remove(query) {
    const ModelLocation = this._model
    return ModelLocation.remove(query)
  }
}

module.exports = { LocationRepository }
