'use strict'

const { BulkBrands } = require('../../src/uses-cases/BulkBrands')
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

describe('Testing BulkBrands use case', () => {
  afterAll(() => {
    DbBrandRepository.mockClear()
    DbLocationRepository.mockClear()
    Md5Repository.mockClear()
  })

  beforeAll(() => {
    jest.spyOn(DbBrandRepository.prototype, 'remove').mockImplementation(() => {
      return {
        deletedCount: 1
      }
    })
    jest.spyOn(DbBrandRepository.prototype, 'find').mockImplementation(() => [])
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

    const bulkBrands = new BulkBrands(
      [
        {
          name: 'Cinepolis',
          logo: 'https://www.cinepolis.com/logo2.png'
        }
      ],
      dbBrandRepository,
      dbLocationRepository,
      md5Repository
    )
    await bulkBrands.exec()

    const mockDbBrandRepository = DbBrandRepository.mock.instances[0]
    const mockDbLocationRepository = DbLocationRepository.mock.instances[0]
    const mockMd5Repository = Md5Repository.mock.instances[0]

    expect(mockDbBrandRepository.validate).toHaveBeenCalledTimes(1)
    expect(mockDbBrandRepository.find).toHaveBeenCalledTimes(1)
    expect(mockDbBrandRepository.insertOrUpdate).toHaveBeenCalledTimes(1)

    expect(mockDbLocationRepository.remove).toHaveBeenCalledTimes(1)

    expect(mockMd5Repository.exec).toHaveBeenCalledTimes(1)
  })
})
