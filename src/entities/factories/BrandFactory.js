'use strict'

const { Brand } = require('../models')

const { BaseFactory } = require('./BaseFactory')

class BrandFactory extends BaseFactory {
  constructor(properties, validator, md5Repository) {
    super(
      {
        ...properties,
        computedUnique: md5Repository.exec(`${properties.name}`)
      },
      validator
    )
  }

  async createEntity() {
    super.validateEntity(Brand.schema, Brand.persistName)
    return new Brand(this._properties)
  }
}
module.exports = { BrandFactory }
