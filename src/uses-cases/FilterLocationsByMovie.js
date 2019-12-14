/* eslint-disable class-methods-use-this */

'use strict'

const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:FilterLocationsByMovie'
)

class FilterLocationsByMovie {
  constructor(
    movie,
    date,
    timeOfDay,
    timeZone,
    latitude,
    longitude,
    dbLocationRepository
  ) {
    this._movie = movie
    this._date = date
    this._timeOfDay = timeOfDay
    this._timeZone = timeZone
    this._latitude = latitude
    this._longitude = longitude
    this._dbLocationRepository = dbLocationRepository
  }

  async exec() {
    try {
      return this._dbLocationRepository.findPopulate({
        movie: this._movie,
        date: this._date,
        timeOfDay: this._timeOfDay,
        timeZone: this._timeZone,
        latitude: this._latitude,
        longitude: this._longitude
      })
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }

    // movie.name like 'Terminator' and
    // schedule.date < dateEnd && schedule.date > dateStart and
    // sort location.latitude
    // sort location.longitude
  }
}

module.exports = { FilterLocationsByMovie }
