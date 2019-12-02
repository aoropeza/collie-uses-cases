/* eslint-disable class-methods-use-this */

'use strict'

const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const { Location } = require('../../entities/models')
const { Db } = require('../interfaces/Db')

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

class DbLocationRepository extends Db {
  constructor() {
    super()
    this._schema = mongoose.Schema({
      ...Location.schema,
      brand: { ...Location.schema.brand, type: Schema.Types.ObjectId }
    })
    this._model = mongoose.model(Location.persistName, this._schema)
  }

  async validate(properties) {
    const ModelLocation = this._model
    const source = new ModelLocation(properties)

    await source.validateSync()
  }

  async find(query) {
    const ModelBrand = this._model
    return ModelBrand.find(query)
  }

  async remove(query) {
    const ModelLocation = this._model
    return ModelLocation.remove(query)
  }

  async insertOrUpdate(entity) {
    const ModelLocation = this._model
    return ModelLocation.findOneAndUpdate(
      {
        computedUnique: entity.computedUnique
      },
      {
        brand: entity.brand,
        name: entity.name,
        latitude: entity.latitude,
        longitude: entity.longitude,
        address: entity.address,
        computedUnique: entity.computedUnique
      },
      insertOrUpdate
    )
  }
}

module.exports = { DbLocationRepository }
