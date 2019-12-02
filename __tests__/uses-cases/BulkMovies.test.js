'use strict'

const { BulkMovies } = require('../../src/uses-cases/BulkMovies')
const {
  DbMovieRepository
} = require('../../src/interface-adapters/implementations/DbMovieRepository')
const {
  DbScheduleRepository
} = require('../../src/interface-adapters/implementations/DbScheduleRepository')
const {
  Md5Repository
} = require('../../src/interface-adapters/implementations/Md5Repository')

jest.mock('../../src/interface-adapters/implementations/DbMovieRepository')
jest.mock('../../src/interface-adapters/implementations/DbScheduleRepository')
jest.mock('../../src/interface-adapters/implementations/Md5Repository')

describe('Testing BulkMovies use case', () => {
  afterAll(() => {
    DbMovieRepository.mockClear()
    DbScheduleRepository.mockClear()
    Md5Repository.mockClear()
  })

  beforeAll(() => {
    jest.spyOn(DbMovieRepository.prototype, 'remove').mockImplementation(() => {
      return {
        deletedCount: 1
      }
    })
    jest.spyOn(DbMovieRepository.prototype, 'find').mockImplementation(() => [])
    jest
      .spyOn(DbScheduleRepository.prototype, 'remove')
      .mockImplementation(() => {
        return {
          deletedCount: 1
        }
      })
    jest
      .spyOn(Md5Repository.prototype, 'exec')
      .mockImplementation(value => value)
  })

  test('Should follow strict flow of steps', async () => {
    const dbMovieRepository = new DbMovieRepository()
    const dbScheduleRepository = new DbScheduleRepository()
    const md5Repository = new Md5Repository()

    const bulkMovies = new BulkMovies(
      [
        {
          name: 'Terminator'
        }
      ],
      dbMovieRepository,
      dbScheduleRepository,
      md5Repository
    )
    await bulkMovies.exec()

    const mockDbMovieRepository = DbMovieRepository.mock.instances[0]
    const mockDbScheduleRepository = DbScheduleRepository.mock.instances[0]
    const mockMd5Repository = Md5Repository.mock.instances[0]

    expect(mockDbMovieRepository.validate).toHaveBeenCalledTimes(1)
    expect(mockDbMovieRepository.find).toHaveBeenCalledTimes(1)
    expect(mockDbMovieRepository.insertOrUpdate).toHaveBeenCalledTimes(1)

    expect(mockDbScheduleRepository.remove).toHaveBeenCalledTimes(1)

    expect(mockMd5Repository.exec).toHaveBeenCalledTimes(1)
  })
})
