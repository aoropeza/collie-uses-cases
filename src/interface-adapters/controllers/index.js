'use strict'

const { AddSource } = require('../../uses-cases/AddSource')
const { BulkBrands } = require('../../uses-cases/BulkBrands')
const { SourceRepository } = require('../repositories/SourceRepository')
const { BrandRepository } = require('../repositories/BrandRepository')
const { LocationRepository } = require('../repositories/LocationRepository')

const sourceRepository = new SourceRepository()
const brandRepository = new BrandRepository()
const locationRepository = new LocationRepository()

module.exports = {
  addSource: async ({ sources }) => {
    // Input

    // Treatment
    await new AddSource(sources, sourceRepository).exec()

    // Output
  },
  bulkBrands: async ({ brands }) => {
    // Input

    // Treatment
    await new BulkBrands(brands, brandRepository, locationRepository).exec()

    // Output
  },
  bulkLocations: '11',
  bulkMovies: '11',
  bulkSchedules: '11',
  filterActiveMovies: '11',
  filterMoviesInfo: '11',
  filterAddress: '11'
}
