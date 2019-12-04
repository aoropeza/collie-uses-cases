/* eslint-disable class-methods-use-this */

'use strict'

const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:FilterActiveMovies'
)

class FilterActiveMovies {
  constructor(date, timeOfDay, timeZone, dbMovieRepository) {
    this._date = date
    this._timeOfDay = timeOfDay
    this._timeZone = timeZone
    this._dbMovieRepository = dbMovieRepository
  }

  async exec() {
    try {
      return this._dbMovieRepository.findPopulate({
        date: this._date,
        timeOfDay: this._timeOfDay,
        timeZone: this._timeZone
      })
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }

    // schedule.date < dateEnd && schedule.date > dateStart and
    // sort location.latitude
    // sort location.longitude
  }
}

module.exports = { FilterActiveMovies }
