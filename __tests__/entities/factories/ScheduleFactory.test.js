'use strict'

const {
  ScheduleFactory
} = require('../../../src/entities/factories/ScheduleFactory')

describe('Validating BrandFactory properties', () => {
  test('Should generate computedUnique propertie', async () => {
    const entity = new ScheduleFactory(
      {
        movie: 'movie',
        startTime: 'startTime',
        duration: 'duration'
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

    expect(brand.computedUnique).toBe('moviestartTimeduration')
  })
})
