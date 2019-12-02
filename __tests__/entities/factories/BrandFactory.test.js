'use strict'

const { BrandFactory } = require('../../../src/entities/factories/BrandFactory')

describe('Validating BrandFactory properties', () => {
  test('Should generate computedUnique propertie', async () => {
    const entity = new BrandFactory(
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
