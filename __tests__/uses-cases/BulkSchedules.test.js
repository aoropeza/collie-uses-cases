'use strict'

const { BulkSchedules } = require('../../src/uses-cases/BulkSchedules')
const {
  DbBrandRepository
} = require('../../src/interface-adapters/implementations/DbBrandRepository')
const {
  DbLocationRepository
} = require('../../src/interface-adapters/implementations/DbLocationRepository')
const {
  DbMovieRepository
} = require('../../src/interface-adapters/implementations/DbMovieRepository')
const {
  DbScheduleRepository
} = require('../../src/interface-adapters/implementations/DbScheduleRepository')
const {
  Md5Repository
} = require('../../src/interface-adapters/implementations/Md5Repository')

jest.mock('../../src/interface-adapters/implementations/DbBrandRepository')
jest.mock('../../src/interface-adapters/implementations/DbLocationRepository')
jest.mock('../../src/interface-adapters/implementations/DbMovieRepository')
jest.mock('../../src/interface-adapters/implementations/DbScheduleRepository')
jest.mock('../../src/interface-adapters/implementations/Md5Repository')

describe('Testing BulkSchedules use case', () => {
  afterAll(() => {
    DbBrandRepository.mockClear()
    DbLocationRepository.mockClear()
    DbMovieRepository.mockClear()
    DbScheduleRepository.mockClear()
    Md5Repository.mockClear()
  })

  beforeAll(() => {
    jest
      .spyOn(DbBrandRepository.prototype, 'insertOrUpdate')
      .mockImplementation(() => {
        return {
          _id: 1
        }
      })
    jest
      .spyOn(DbLocationRepository.prototype, 'insertOrUpdate')
      .mockImplementation(() => {
        return {
          _id: 1
        }
      })
    jest
      .spyOn(DbMovieRepository.prototype, 'insertOrUpdate')
      .mockImplementation(() => {
        return {
          _id: 1
        }
      })
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
    const dbBrandRepository = new DbBrandRepository()
    const dbLocationRepository = new DbLocationRepository()
    const dbMovieRepository = new DbMovieRepository()
    const dbScheduleRepository = new DbScheduleRepository()
    const md5Repository = new Md5Repository()

    const bulkSchedules = new BulkSchedules(
      {
        name: 'Cinepolis',
        logo: 'https://www.cinepolis.com/logo2.png'
      },
      {
        name: 'Plaza oriente',
        latitude: 19.4574844,
        longitude: 19.457444,
        address: 'Esquina calle oriente 66 número 34'
      },
      { name: 'The current war' },
      [
        {
          startTime: new Date(),
          duration: 120,
          typeRoom: 'kids'
        }
      ],
      dbBrandRepository,
      dbLocationRepository,
      dbMovieRepository,
      dbScheduleRepository,
      md5Repository
    )
    await bulkSchedules.exec()

    const mockDbBrandRepository = DbBrandRepository.mock.instances[0]
    const mockDbLocationRepository = DbLocationRepository.mock.instances[0]
    const mockDbMovieRepository = DbMovieRepository.mock.instances[0]
    const mockDbScheduleRepository = DbScheduleRepository.mock.instances[0]
    const mockMd5Repository = Md5Repository.mock.instances[0]

    expect(mockDbBrandRepository.insertOrUpdate).toHaveBeenCalledTimes(1)
    expect(mockDbLocationRepository.insertOrUpdate).toHaveBeenCalledTimes(1)
    expect(mockDbMovieRepository.insertOrUpdate).toHaveBeenCalledTimes(1)

    expect(mockDbScheduleRepository.remove).toHaveBeenCalledTimes(1)
    expect(mockDbScheduleRepository.insertOrUpdate).toHaveBeenCalledTimes(1)

    expect(mockMd5Repository.exec).toHaveBeenCalledTimes(4)
  })
})
