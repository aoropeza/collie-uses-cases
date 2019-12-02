'use strict'

const { Movie } = require('../models')

const { BaseFactory } = require('./BaseFactory')

class MovieFactory extends BaseFactory {
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
    super.validateEntity(Movie.schema, Movie.persistName)
    return new Movie(this._properties)
  }
}
module.exports = { MovieFactory }
