/* eslint-disable class-methods-use-this */

'use strict'

const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const { Schedule } = require('../../entities/models')
const { Db } = require('../interfaces/Db')

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

class DbScheduleRepository extends Db {
  constructor() {
    super()
    this._schema = mongoose.Schema({
      ...Schedule.schema,
      movie: { ...Schedule.schema.movie, type: Schema.Types.ObjectId },
      location: { ...Schedule.schema.location, type: Schema.Types.ObjectId }
    })
    this._model = mongoose.model(Schedule.persistName, this._schema)
  }

  async validate(properties) {
    const ModelSchedule = this._model
    const source = new ModelSchedule(properties)

    await source.validateSync()
  }

  async remove(query) {
    const ModelSchedule = this._model
    return ModelSchedule.remove(query)
  }

  async insertOrUpdate(entity) {
    const ModelSchedule = this._model
    return ModelSchedule.findOneAndUpdate(
      {
        computedUnique: entity.computedUnique
      },
      {
        movie: entity.movie,
        location: entity.location,
        startTime: entity.startTime,
        duration: entity.duration,
        typeRoom: entity.typeRoom,
        computedUnique: entity.computedUnique
      },
      insertOrUpdate
    )
  }
}

module.exports = { DbScheduleRepository }
