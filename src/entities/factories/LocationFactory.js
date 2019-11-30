'use strict'

const { Location } = require('../models')

const { BaseFactory } = require('./BaseFactory')

class LocationFactory extends BaseFactory {
  async buildEntity() {
    super.validateEntity(Location.schema, Location.persistName)
    return new Location(this._properties)
  }
}
module.exports = LocationFactory
