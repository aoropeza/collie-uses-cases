'use strict'

const { MovieFactory } = require('../../../src/entities/factories/MovieFactory')

describe('Validating BrandFactory properties', () => {
  test('Should generate computedUnique propertie', async () => {
    const entity = new MovieFactory(
      {
        name: 'name'
      },
      {
        validate: () => {
          return undefined
        }
      },
      {
        exec: value => value
      }
    )

    const brand = await entity.createEntity()

    expect(brand.computedUnique).toBe('name')
  })
})
