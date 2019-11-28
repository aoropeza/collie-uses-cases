'use strict'

const { bulkLocations } = require('./bulkLocations')
const { bulkBrands } = require('./bulkBrands')
const { addSource } = require('./addSource')
const { bulkMovies } = require('./bulkMovies')
const { bulkSchedules } = require('./bulkSchedules')

module.exports = {
  addSource,
  bulkBrands,
  bulkLocations,
  bulkMovies,
  bulkSchedules,
  filterActiveMovies: '11',
  filterMoviesInfo: '11',
  filterAddress: '11'
}
