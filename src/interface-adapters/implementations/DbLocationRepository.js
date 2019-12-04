/* eslint-disable class-methods-use-this */

'use strict'

const moment = require('moment-timezone')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const logger = require('../../frameworks-drivers/logger')(
  'collie:uses-cases:DbLocationRepository'
)
const { Location } = require('../../entities/models')
const { Db } = require('../interfaces/Db')

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

class DbLocationRepository extends Db {
  constructor() {
    super()
    this._schema = mongoose.Schema({
      ...Location.schema,
      brand: { ...Location.schema.brand, type: Schema.Types.ObjectId }
    })
    this._model = mongoose.model(Location.persistName, this._schema)
  }

  async validate(properties) {
    const ModelLocation = this._model
    const source = new ModelLocation({
      brand: properties.brand,
      name: properties.name,
      geometry: {
        type: 'Point',
        coordinates: [properties.longitude, properties.latitude]
      },
      address: properties.address,
      computedUnique: properties.computedUnique
    })

    await source.validateSync()
  }

  async find(query) {
    const ModelBrand = this._model
    return ModelBrand.find(query)
  }

  async remove(query) {
    const ModelLocation = this._model
    return ModelLocation.remove(query)
  }

  async insertOrUpdate(entity) {
    const ModelLocation = this._model
    return ModelLocation.findOneAndUpdate(
      {
        computedUnique: entity.computedUnique
      },
      {
        brand: entity.brand,
        name: entity.name,
        geometry: {
          type: 'Point',
          coordinates: [entity.longitude, entity.latitude]
        },
        address: entity.address,
        computedUnique: entity.computedUnique
      },
      insertOrUpdate
    )
  }

  async findPopulate({
    movie,
    date,
    timeOfDay,
    timeZone,
    latitude,
    longitude
  }) {
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

      const ModelLocation = this._model
      return ModelLocation.aggregate([
        {
          $geoNear: {
            near: { type: 'Point', coordinates: [longitude, latitude] },
            distanceField: 'dist_calculated',
            spherical: true
          }
        },
        {
          $lookup: {
            from: 'brands',
            let: { brandId: '$brand' }, // $brand comes from local(locations)
            as: 'brandInfo',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$_id', '$$brandId'] }] // _id comes from foreign(brand)
                  }
                }
              },
              { $project: { _id: 0, __v: 0, computedUnique: 0 } }
            ]
          }
        },
        {
          $unwind: '$brandInfo'
        },
        {
          $lookup: {
            from: 'schedules',
            let: { locationId: '$_id' },
            as: 'schedulesInfo',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$location', '$$locationId'] }]
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  __v: 0,
                  computedUnique: 0,
                  location: 0
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
        },
        {
          $lookup: {
            from: 'movies',
            let: { movieId: '$schedulesInfo.movie' }, // $brand comes from local(locations)
            as: 'schedulesInfo.movieInfo',
            pipeline: [
              {
                $match: {
                  $expr: {
                    // _id comes from foreign(movies)
                    $and: [{ $eq: ['$_id', '$$movieId'] }].concat(
                      movie ? { $eq: ['$name', movie] } : {}
                    )
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  __v: 0,
                  computedUnique: 0
                }
              }
            ]
          }
        },
        {
          $unwind: '$schedulesInfo.movieInfo'
        },
        {
          $group: {
            _id: {
              address: '$address',
              name: '$name',
              dist_calculated: '$dist_calculated',
              brandInfo: '$brandInfo'
            },
            schedulesInfo: { $push: '$schedulesInfo' }
          }
        },
        {
          $project: {
            address: '$_id.address',
            name: '$_id.name',
            dist_calculated: '$_id.dist_calculated',
            brandInfo: '$_id.brandInfo',
            schedulesInfo: '$schedulesInfo'
          }
        },
        {
          $project: {
            _id: 0,
            'schedulesInfo.movie': 0
          }
        },
        {
          $match: {
            'schedulesInfo.startTime': {
              $gt: dateStart.utcOffset(0).toDate(),
              $lt: dateEnd.utcOffset(0).toDate()
            }
          }
        }
      ])
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
}

module.exports = { DbLocationRepository }
