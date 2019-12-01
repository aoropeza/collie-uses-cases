'use strict'

const crypto = require('crypto')

const { MovieFactory, ScheduleFactory } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:BulkSchedules'
)

class BulkSchedules {
  constructor(
    movie,
    schedules,
    bdMovieRepository,
    dbScheduleRepository,
    md5Repository
  ) {
    this._movie = movie
    this._schedules = schedules
    this._bdMovieRepository = bdMovieRepository
    this._dbScheduleRepository = dbScheduleRepository
    this._md5Repository = md5Repository
  }

  async exec() {
    try {
      const movieFactory = new MovieFactory(
        {
          ...this._movie,
          computedUnique: this._md5Repository.exec(`${this._movie.name}`)
        },
        this._bdMovieRepository
      )
      const entity = await movieFactory.createEntity()
      const newUpdatedMovie = await this._bdMovieRepository.insertOrUpdate(
        entity
      )

      const schedules = this._schedules.map(item => {
        return {
          ...item,
          movie: newUpdatedMovie._id,
          computedUnique: this._md5Repository.exec(
            `${newUpdatedMovie._id}${item.startTime}${item.duration}`
          )
        }
      })

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

      const saveSchedule = async item => {
        const scheduleFactory = new ScheduleFactory(
          {
            ...item
          },
          this._dbScheduleRepository
        )
        const entitySchedule = await scheduleFactory.createEntity()
        await this._dbScheduleRepository.insertOrUpdate(entitySchedule)
      }

      const schedulePromises = schedules.map(item => saveSchedule(item))
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
