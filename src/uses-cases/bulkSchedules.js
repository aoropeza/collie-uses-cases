'use strict'

const crypto = require('crypto')

const { Movie, Schedule } = require('../entities')
const logger = require('../lib/logger')('collie:uses-cases:bulkSchedules')

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

const bulkSchedules = async ({ movie, schedules: schedulesArg }) => {
  try {
    const newUpdatedMovie = await Movie.findOneAndUpdate(
      { name: movie.name },
      movie,
      insertOrUpdate
    )

    const schedules = schedulesArg.map(item => {
      return {
        ...item,
        movie: newUpdatedMovie._id,
        computedUnique: crypto
          .createHash('md5')
          .update(`${newUpdatedMovie._id}${item.startTime}${item.duration}`)
          .digest('hex')
      }
    })

    const schedulesWillRemove = await Schedule.remove({
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
      await Schedule.findOneAndUpdate(
        {
          startTime: item.startTime,
          duration: item.duration
        },
        {
          ...item
        },
        insertOrUpdate
      )
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

module.exports = { bulkSchedules }
