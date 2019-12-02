'use strict'

const {
  LocationFactory
} = require('../../../src/entities/factories/LocationFactory')

describe('Validating BrandFactory properties', () => {
  test('Should generate computedUnique propertie', async () => {
    const entity = new LocationFactory(
      {
        brand: 'brand',
        name: 'name',
        latitude: 'latitude',
        longitude: 'longitude'
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

    expect(brand.computedUnique).toBe('brandnamelatitudelongitude')
  })
})
