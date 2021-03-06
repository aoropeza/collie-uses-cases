'use strict'

const { AddSources } = require('../../uses-cases')
const { BulkBrands } = require('../../uses-cases')
const { BulkLocations } = require('../../uses-cases')
const { BulkMovies } = require('../../uses-cases')
const { BulkSchedules } = require('../../uses-cases')
const { FilterLocationsByMovie } = require('../../uses-cases')
const { FilterActiveMovies } = require('../../uses-cases')
const { DbSourceRepository } = require('../implementations/DbSourceRepository')
const { DbBrandRepository } = require('../implementations/DbBrandRepository')
const {
  DbLocationRepository
} = require('../implementations/DbLocationRepository')
const { DbMovieRepository } = require('../implementations/DbMovieRepository')
const {
  DbScheduleRepository
} = require('../implementations/DbScheduleRepository')
const { Md5Repository } = require('../implementations/Md5Repository')

const dbSourceRepository = new DbSourceRepository()
const dbBrandRepository = new DbBrandRepository()
const dbLocationRepository = new DbLocationRepository()
const dbMovieRepository = new DbMovieRepository()
const dbScheduleRepository = new DbScheduleRepository()

const md5Repository = new Md5Repository()

class Controllers {
  static async addSources(sources) {
    // Input

    // Treatment
    await new AddSources(sources, dbSourceRepository).exec()

    // Output
  }

  static async bulkBrands(brands) {
    // Input

    // Treatment
    await new BulkBrands(
      brands,
      dbBrandRepository,
      dbLocationRepository,
      md5Repository
    ).exec()

    // Output
  }

  static async bulkLocations(brand, locations) {
    // Input

    // Treatment
    await new BulkLocations(
      brand,
      locations,
      dbBrandRepository,
      dbLocationRepository,
      md5Repository
    ).exec()

    // Output
  }

  static async bulkMovies(movies) {
    // Input

    // Treatment
    await new BulkMovies(
      movies,
      dbMovieRepository,
      dbScheduleRepository,
      md5Repository
    ).exec()

    // Output
  }

  static async bulkSchedules(brand, location, movie, schedules) {
    // Input

    // Treatment
    await new BulkSchedules(
      brand,
      location,
      movie,
      schedules,
      dbBrandRepository,
      dbLocationRepository,
      dbMovieRepository,
      dbScheduleRepository,
      md5Repository
    ).exec()

    // Output
  }

  static async filterLocationsByMovie(
    movie,
    date,
    timeOfDay,
    timeZone,
    latitude,
    longitude
  ) {
    // Input

    // Treatment
    return new FilterLocationsByMovie(
      movie,
      date,
      timeOfDay,
      timeZone,
      latitude,
      longitude,
      dbLocationRepository
    ).exec()

    // Output
  }

  static async filterActiveMovies(date, timeOfDay, timeZone) {
    // Input

    // Treatment
    return new FilterActiveMovies(
      date,
      timeOfDay,
      timeZone,
      dbMovieRepository
    ).exec()

    // Output
  }
}

module.exports = { Controllers }
