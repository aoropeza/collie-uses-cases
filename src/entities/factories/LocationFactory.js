'use strict'

const { Location } = require('../models')

const { BaseFactory } = require('./BaseFactory')

class LocationFactory extends BaseFactory {
  constructor(properties, validator, md5Repository) {
    super(
      {
        ...properties,
        computedUnique: md5Repository.exec(
          `${properties.brand}${properties.name}${properties.latitude}${properties.longitude}`
        )
      },
      validator
    )
  }

  async createEntity() {
    super.validateEntity(Location.schema, Location.persistName)
    return new Location(this._properties)
  }
}
module.exports = { LocationFactory }
