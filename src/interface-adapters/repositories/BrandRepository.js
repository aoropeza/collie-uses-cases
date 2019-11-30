/* eslint-disable class-methods-use-this */

'use strict'

const mongoose = require('mongoose')

const { Brand } = require('../../entities/models')
const { DbStrategy } = require('../strategies/DbStrategy')

class BrandRepository extends DbStrategy {
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

  async findOneAndUpdate(ids, entity, options) {
    const ModelBrand = this._model
    await ModelBrand.findOneAndUpdate(
      ids,
      {
        name: entity.name,
        logo: entity.logo,
        computedUnique: entity.computedUnique
      },
      options
    )
  }
}

module.exports = { BrandRepository }
