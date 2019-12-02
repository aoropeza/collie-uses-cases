'use strict'

const { BaseFactory } = require('../../../src/entities/factories/BaseFactory')

describe('Testing BaseFactory validating properties', () => {
  test('Should throw error when validate object return false', async () => {
    const entity = new BaseFactory(
      {},
      {
        validate: () => {
          return 'Errors'
        }
      }
    )

    await expect(entity.validateEntity()).rejects.toThrow()
  })
})
