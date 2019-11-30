'use strict'

const { Source } = require('../models')

const { BaseFactory } = require('./BaseFactory')

class SourceFactory extends BaseFactory {
  async createEntity() {
    await super.validateEntity(Source.schema, Source.persistName)
    return new Source(this._properties)
  }
}
module.exports = { SourceFactory }
