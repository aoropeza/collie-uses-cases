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

      const sortByLocation = (_longitude, _latitude) => [
        {
          $geoNear: {
            near: { type: 'Point', coordinates: [_longitude, _latitude] },
            distanceField: 'dist_calculated',
            spherical: true
          }
        }
      ]

      const populateBrands = [
        {
          $lookup: {
            from: 'brands',
            let: { brandId: '$brand' }, // $brand comes from local table
            as: 'brandInfo',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$_id', '$$brandId'] }] // _id comes from foreign table(brand)
                  }
                }
              }
            ]
          }
        },
        {
          $unwind: '$brandInfo'
        }
      ]

      const populateSchedules = [
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
      const populateMovies = [
        {
          $lookup: {
            from: 'movies',
            let: { movieId: '$schedulesInfo.movie' },
            as: 'schedulesInfo.movieInfo',
            pipeline: [
              {
                $match: {
                  $expr: {
                    // _id comes from foreign(movies)
                    $and: [
                      { $eq: ['$_id', '$$movieId'] },
                      { $eq: ['$name', movie] }
                    ]
                  }
                }
              }
            ]
          }
        },
        {
          $unwind: '$schedulesInfo.movieInfo'
        }
      ]
      const group = [
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
      const project = [
        {
          $project: {
            address: '$_id.address',
            name: '$_id.name',
            dist_calculated: '$_id.dist_calculated',
            brand: '$_id.brandInfo',
            schedules: '$schedulesInfo'
          }
        },
        {
          $project: {
            _id: 0,
            'brand._id': 0,
            'brand.computedUnique': 0,
            'brand.__v': 0,
            'schedules.movie': 0,
            'schedules._id': 0,
            'schedules.computedUnique': 0,
            'schedules.__v': 0,
            'schedules.location': 0,
            'schedules.startTime': 0,
            'schedules.movieInfo._id': 0,
            'schedules.movieInfo.computedUnique': 0,
            'schedules.movieInfo.__v': 0
          }
        }
      ]

      const agregate = []
        .concat(sortByLocation(longitude, latitude))
        .concat(populateBrands)
        .concat(populateSchedules)
        .concat(populateMovies)
        .concat(group)
        .concat(filter)
        .concat(project)

      logger.info(agregate)

      return ModelLocation.aggregate(agregate)
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
}

module.exports = { DbLocationRepository }
