/* eslint-disable class-methods-use-this */

'use strict'

const mongoose = require('mongoose')

const { Brand } = require('../../entities/models')
const { Db } = require('../interfaces/Db')

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

class DbBrandRepository extends Db {
  constructor() {
    super()
    this._schema = mongoose.Schema(Brand.schema)
    this._model = mongoose.model(Brand.persistName, this._schema)
  }

  async validate(properties) {
    const ModelBrand = this._model
    const source = new ModelBrand(properties)

    await source.validateSync()
  }

  async find(query) {
    const ModelBrand = this._model
    return ModelBrand.find(query)
  }

  async remove(query) {
    const ModelBrand = this._model
    return ModelBrand.remove(query)
  }

  async insertOrUpdate(entity) {
    const ModelBrand = this._model
    return ModelBrand.findOneAndUpdate(
      {
        name: entity.name
      },
      {
        name: entity.name,
        logo: entity.logo,
        computedUnique: entity.computedUnique
      },
      insertOrUpdate
    )
  }
}

module.exports = { DbBrandRepository }
