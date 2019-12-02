'use strict'

const { AddSources } = require('../../src/uses-cases/AddSources')
const {
  DbSourceRepository
} = require('../../src/interface-adapters/implementations/DbSourceRepository')

jest.mock('../../src/interface-adapters/implementations/DbSourceRepository')

describe('Testing AddSource use case', () => {
  afterEach(() => {
    DbSourceRepository.mockClear()
  })

  test('Should follow strict flow of steps', async () => {
    const dbSourceRepository = new DbSourceRepository()
    const addSources = new AddSources(
      [
        {
          ip: '127.0.0.1',
          clientType: 'web',
          clientName: 'chrome',
          clientSo: 'mac',
          clientVersion: '12.2.3'
        }
      ],
      dbSourceRepository
    )
    await addSources.exec()

    const mockDbSourceRepository = DbSourceRepository.mock.instances[0]
    expect(mockDbSourceRepository.save).toHaveBeenCalledTimes(1)
    expect(mockDbSourceRepository.validate).toHaveBeenCalledTimes(1)
  })
})
