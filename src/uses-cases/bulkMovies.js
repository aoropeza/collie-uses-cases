'use strict'

const { MovieFactory } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:BulkMovies'
)

class BulkMovies {
  constructor(movies, dbMovieRepository, dbScheduleRepository, md5Repository) {
    this._movies = movies
    this._dbMovieRepository = dbMovieRepository
    this._dbScheduleRepository = dbScheduleRepository
    this._md5Repository = md5Repository
  }

  async exec() {
    try {
      const movieEntityPromises = this._movies.map(item => {
        const movieFactory = new MovieFactory(
          {
            ...item
          },
          this._dbMovieRepository,
          this._md5Repository
        )
        return movieFactory.createEntity()
      })
      const movies = await Promise.all(movieEntityPromises)

      const idMoviesWillRemove = (
        await this._dbMovieRepository.find({
          computedUnique: {
            $nin: movies.map(item => item.computedUnique)
          }
        })
      ).map(item => item._id)

      // Removing unused movies
      const moviesWillRemove = await this._dbMovieRepository.remove({
        _id: idMoviesWillRemove
      })
      logger.info(`moviesWillRemove: ${moviesWillRemove.deletedCount}`)

      // Removing schedules ref to unused movies
      const schedulesWithMovieWillRemove = await this._dbScheduleRepository.remove(
        {
          movie: idMoviesWillRemove
        }
      )
      logger.info(
        `schedulesWithMovieWillRemove: ${schedulesWithMovieWillRemove.deletedCount}`
      )

      const brandPromises = movies.map(entity =>
        this._dbMovieRepository.insertOrUpdate(entity)
      )
      logger.info(`movies to save or update: ${brandPromises.length}`)

      await Promise.all(brandPromises)

      logger.info('Ended correctly')
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
}

module.exports = { BulkMovies }
