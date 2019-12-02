'use strict'

const { BulkLocations } = require('../../src/uses-cases/BulkLocations')
const {
  DbBrandRepository
} = require('../../src/interface-adapters/implementations/DbBrandRepository')
const {
  DbLocationRepository
} = require('../../src/interface-adapters/implementations/DbLocationRepository')
const {
  Md5Repository
} = require('../../src/interface-adapters/implementations/Md5Repository')

jest.mock('../../src/interface-adapters/implementations/DbBrandRepository')
jest.mock('../../src/interface-adapters/implementations/DbLocationRepository')
jest.mock('../../src/interface-adapters/implementations/Md5Repository')

describe('Testing BulkLocations use case', () => {
  afterAll(() => {
    DbBrandRepository.mockClear()
    DbLocationRepository.mockClear()
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
      .spyOn(DbLocationRepository.prototype, 'remove')
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
    const md5Repository = new Md5Repository()

    const bulkLocations = new BulkLocations(
      {
        name: 'Cinepolis',
        logo: 'https://www.cinepolis.com/logo2.png'
      },
      [
        {
          name: 'Plaza central',
          latitude: 19.4574861,
          longitude: 19.4574862,
          address: 'Esquina calle norte 13 número 56'
        }
      ],
      dbBrandRepository,
      dbLocationRepository,
      md5Repository
    )
    await bulkLocations.exec()

    const mockDbBrandRepository = DbBrandRepository.mock.instances[0]
    const mockDbLocationRepository = DbLocationRepository.mock.instances[0]
    const mockMd5Repository = Md5Repository.mock.instances[0]

    expect(mockDbBrandRepository.insertOrUpdate).toHaveBeenCalledTimes(1)

    expect(mockDbLocationRepository.remove).toHaveBeenCalledTimes(1)
    expect(mockDbLocationRepository.insertOrUpdate).toHaveBeenCalledTimes(1)

    expect(mockMd5Repository.exec).toHaveBeenCalledTimes(2)
  })
})
