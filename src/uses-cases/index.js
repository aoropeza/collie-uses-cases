'use strict'

const { bulkLocations } = require('./bulkLocations')
const { bulkBrands } = require('./bulkBrands')
const { addSource } = require('./addSource')
const { bulkMovies } = require('./bulkMovies')

module.exports = {
  addSource,
  bulkBrands,
  bulkLocations,
  bulkMovies,
  bulkSchedules: '11',
  filterActiveMovies: '11',
  filterMoviesInfo: '11',
  filterAddress: '11'
}
