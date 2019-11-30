'use strict'

const { Movie } = require('../models')

const { BaseFactory } = require('./BaseFactory')

class MovieFactory extends BaseFactory {
  async buildEntity() {
    super.validateEntity(Movie.schema, Movie.persistName)
    return new Movie(this._properties)
  }
}
module.exports = MovieFactory
