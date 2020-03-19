/* eslint-disable class-methods-use-this */

'use strict'

const moment = require('moment-timezone')
const mongoose = require('mongoose')

const logger = require('../../frameworks-drivers/logger')(
  'collie:uses-cases:DbMovieRepository'
)
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

    return source.validateSync()
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
        computedUnique: entity.computedUnique,
        cover: entity.cover
      },
      insertOrUpdate
    )
  }

  async findPopulate({ date, timeOfDay, timeZone }) {
    try {
      const times = timeOfDay.split('-')
      const dateStart = moment.tz(
        `${date} ${times[0]}`,
        'YYYY-MM-DD HH:mm',
        timeZone
      )
      const dateEnd = moment.tz(
        `${date} ${times[1]}`,
        'YYYY-MM-DD HH:mm',
        timeZone
      )

      const ModelMovie = this._model

      const populateSchedules = [
        {
          $lookup: {
            from: 'schedules',
            let: { movieId: '$_id' },
            as: 'schedulesInfo',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$movie', '$$movieId'] }]
                  }
                }
              },
              {
                $addFields: {
                  startTimeZone: {
                    $dateToString: {
                      format: '%Y-%m-%d %H:%M',
                      date: '$startTime',
                      timezone: timeZone
                    }
                  }
                }
              }
            ]
          }
        },
        {
          $unwind: '$schedulesInfo'
        }
      ]
      const filter = [
        {
          $match: {
            'schedulesInfo.startTime': {
              $gt: dateStart.utcOffset(0).toDate(),
              $lt: dateEnd.utcOffset(0).toDate()
            }
          }
        }
      ]
      const group = [
        {
          $group: {
            _id: {
              name: '$name',
              computedUnique: '$computedUnique',
              cover: '$cover'
            }
          }
        }
      ]
      const project = [
        {
          $project: {
            name: '$_id.name',
            cover: '$_id.cover',
            id: '$_id.computedUnique'
          }
        },
        {
          $project: {
            _id: false
          }
        }
      ]
      const sort = [{ $sort: { name: 1 } }]

      const aggregate = []
        .concat(populateSchedules)
        .concat(filter)
        .concat(group)
        .concat(project)
        .concat(sort)

      logger.info(aggregate)

      return ModelMovie.aggregate(aggregate)
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
}

module.exports = { DbMovieRepository }
