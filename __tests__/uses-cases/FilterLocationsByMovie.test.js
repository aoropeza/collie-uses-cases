'use strict'

const {
  FilterLocationsByMovie
} = require('../../src/uses-cases/FilterLocationsByMovie')
const {
  DbLocationRepository
} = require('../../src/interface-adapters/implementations/DbLocationRepository')

jest.mock('../../src/interface-adapters/implementations/DbLocationRepository')

describe('Testing FilterMoviesInfo use case', () => {
  afterEach(() => {
    DbLocationRepository.mockClear()
  })

  test('Should follow strict flow of steps', async () => {
    const dbLocationRepository = new DbLocationRepository()
    const filterLocationsByMovie = new FilterLocationsByMovie(
      'The current war',
      '2019-12-04',
      '12:00-17:59',
      'America/Mexico_City',
      19.4499759,
      -99.0704167,
      dbLocationRepository
    )
    await filterLocationsByMovie.exec()

    const mockDbRepository = DbLocationRepository.mock.instances[0]
    expect(mockDbRepository.findPopulate).toHaveBeenCalledTimes(1)
  })
})
