/* eslint-disable class-methods-use-this */

'use strict'

const mongoose = require('mongoose')

const { Movie } = require('../../entities/models')
const { Db } = require('../interfaces/Db')

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

class DbMovieRepository extends Db {
  constructor() {
    super()
    this._schema = mongoose.Schema(Movie.schema)
    this._model = mongoose.model(Movie.persistName, this._schema)
  }

  async validate(properties) {
    const ModelMovie = this._model
    const source = new ModelMovie(properties)

    await source.validateSync()
  }

  async find(query) {
    const ModelMovie = this._model
    return ModelMovie.find(query)
  }

  async remove(query) {
    const ModelMovie = this._model
    return ModelMovie.remove(query)
  }

  async insertOrUpdate(entity) {
    const ModelMovie = this._model
    return ModelMovie.findOneAndUpdate(
      {
        computedUnique: entity.computedUnique
      },
      {
        name: entity.name,
        computedUnique: entity.computedUnique
      },
      insertOrUpdate
    )
  }
}

module.exports = { DbMovieRepository }
