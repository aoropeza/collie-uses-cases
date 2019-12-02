'use strict'

const {
  BrandFactory,
  LocationFactory,
  MovieFactory,
  ScheduleFactory
} = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:BulkSchedules'
)

class BulkSchedules {
  constructor(
    brand,
    location,
    movie,
    schedules,
    dbBrandRepository,
    dbLocationRepository,
    dbMovieRepository,
    dbScheduleRepository,
    md5Repository
  ) {
    this._brand = brand
    this._location = location
    this._movie = movie
    this._schedules = schedules
    this._dbBrandRepository = dbBrandRepository
    this._dbLocationRepository = dbLocationRepository
    this._dbMovieRepository = dbMovieRepository
    this._dbScheduleRepository = dbScheduleRepository
    this._md5Repository = md5Repository
  }

  async exec() {
    try {
      // Searching for brand related
      const brandFactory = new BrandFactory(
        {
          ...this._brand
        },
        this._dbBrandRepository,
        this._md5Repository
      )
      const entityBrand = await brandFactory.createEntity()
      const newUpdatedBrand = await this._dbBrandRepository.insertOrUpdate(
        entityBrand
      )

      // Searching for location related
      const locationFactory = new LocationFactory(
        {
          ...this._location,
          brand: newUpdatedBrand._id
        },
        this._dbLocationRepository,
        this._md5Repository
      )
      const entityLocation = await locationFactory.createEntity()
      const newUpdatedLocation = await this._dbLocationRepository.insertOrUpdate(
        entityLocation
      )

      // Searching for movie related
      const movieFactory = new MovieFactory(
        {
          ...this._movie
        },
        this._dbMovieRepository,
        this._md5Repository
      )
      const entityMovie = await movieFactory.createEntity()
      const newUpdatedMovie = await this._dbMovieRepository.insertOrUpdate(
        entityMovie
      )

      const schedulesEntityPromises = this._schedules.map(item => {
        const scheduleFactory = new ScheduleFactory(
          {
            ...item,
            location: newUpdatedLocation._id,
            movie: newUpdatedMovie._id
          },
          this._dbScheduleRepository,
          this._md5Repository
        )
        return scheduleFactory.createEntity()
      })
      const schedules = await Promise.all(schedulesEntityPromises)

      const schedulesWillRemove = await this._dbScheduleRepository.remove({
        $and: [
          {
            computedUnique: {
              $nin: schedules.map(item => item.computedUnique)
            }
          },
          {
            movie: newUpdatedMovie._id
          }
        ]
      })
      logger.info(`schedulesWillRemove: ${schedulesWillRemove.deletedCount}`)

      const schedulePromises = schedules.map(entity =>
        this._dbScheduleRepository.insertOrUpdate(entity)
      )
      logger.info(`schedules to save or update: ${schedulePromises.length}`)

      await Promise.all(schedulePromises)

      logger.info('Ended correctly')
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
}

module.exports = { BulkSchedules }
