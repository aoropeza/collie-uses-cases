'use strict'

const { MovieFactory } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:BulkBrands'
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
      const movies = this._movies.map(item => {
        return {
          ...item,
          computedUnique: this._md5Repository.exec(`${item.name}`)
        }
      })

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

      const saveMovie = async item => {
        const movieFactory = new MovieFactory(
          {
            ...item
          },
          this._dbMovieRepository
        )
        const entity = await movieFactory.createEntity()
        await this._dbMovieRepository.insertOrUpdate(entity)
      }

      const brandPromises = movies.map(item => saveMovie(item))
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
