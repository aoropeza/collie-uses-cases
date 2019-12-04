'use strict'

const {
  FilterActiveMovies
} = require('../../src/uses-cases/FilterActiveMovies')
const {
  DbMovieRepository
} = require('../../src/interface-adapters/implementations/DbMovieRepository')

jest.mock('../../src/interface-adapters/implementations/DbMovieRepository')

describe('Testing FilterActiveMovies use case', () => {
  afterEach(() => {
    DbMovieRepository.mockClear()
  })

  test('Should follow strict flow of steps', async () => {
    const dbMovieRepository = new DbMovieRepository()
    const filterActiveMovies = new FilterActiveMovies(
      '2019-12-04',
      '12:00-17:59',
      'America/Mexico_City',
      dbMovieRepository
    )
    await filterActiveMovies.exec()

    const mockDbRepository = DbMovieRepository.mock.instances[0]
    expect(mockDbRepository.findPopulate).toHaveBeenCalledTimes(1)
  })
})
