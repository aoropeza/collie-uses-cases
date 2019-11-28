'use strict'

const crypto = require('crypto')

const { Movie, Schedule } = require('../entities')
const logger = require('../lib/logger')('collie:uses-cases:bulkMovies')

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

const bulkMovies = async ({ movies: moviesArg }) => {
  try {
    const movies = moviesArg.map(item => {
      return {
        ...item,
        computedUnique: crypto
          .createHash('md5')
          .update(`${item.name}`)
          .digest('hex')
      }
    })

    const idMoviesWillRemove = (
      await Movie.find({
        computedUnique: {
          $nin: movies.map(location => location.computedUnique)
        }
      })
    ).map(item => item._id)

    // Removing unused movies
    const movieWillRemove = await Movie.remove({
      _id: idMoviesWillRemove
    })
    logger.info(`movieWillRemove: ${movieWillRemove.deletedCount}`)

    // Removing schedules ref to unused movies
    const schedulesWithBrandWillRemove = await Schedule.remove({
      brand: idMoviesWillRemove
    })
    logger.info(
      `locationWithBrandWillRemove: ${schedulesWithBrandWillRemove.deletedCount}`
    )

    const saveBrand = async item => {
      await Movie.findOneAndUpdate(
        {
          name: item.name
        },
        {
          ...item
        },
        insertOrUpdate
      )
    }

    const moviePromises = movies.map(item => saveBrand(item))
    logger.info(`movies to save or update: ${moviePromises.length}`)

    await Promise.all(moviePromises)

    logger.info('Ended correctly')
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

module.exports = { bulkMovies }
