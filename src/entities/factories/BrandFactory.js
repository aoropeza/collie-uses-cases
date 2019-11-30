'use strict'

const { Brand } = require('../models')

const { BaseFactory } = require('./BaseFactory')

class BrandFactory extends BaseFactory {
  async createEntity() {
    super.validateEntity(Brand.schema, Brand.persistName)
    return new Brand(this._properties)
  }
}
module.exports = { BrandFactory }
