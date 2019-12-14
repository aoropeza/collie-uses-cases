'use strict'

const { BrandFactory, LocationFactory } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:BulkLocations'
)

class BulkLocations {
  constructor(
    brand,
    locations,
    dbBrandRepository,
    dbLocationRepository,
    md5Repository
  ) {
    this._brand = brand
    this._locations = locations
    this._dbBrandRepository = dbBrandRepository
    this._dbLocationRepository = dbLocationRepository
    this._md5Repository = md5Repository
  }

  async exec() {
    try {
      const brandFactory = new BrandFactory(
        {
          ...this._brand
        },
        this._dbBrandRepository,
        this._md5Repository
      )
      const entityBrand = await brandFactory.createEntity()
      const newUpdatedBrand = await this._dbBrandRepository.insertOrUpdate(
        entityBrand
      )

      const locationEntityPromises = this._locations.map(item => {
        const locationFactory = new LocationFactory(
          {
            ...item,
            brand: newUpdatedBrand._id
          },
          this._dbLocationRepository,
          this._md5Repository
        )
        return locationFactory.createEntity()
      })
      const locations = await Promise.all(locationEntityPromises)

      const locationsWillRemove = await this._dbLocationRepository.remove({
        $and: [
          {
            computedUnique: {
              $nin: locations.map(item => item.computedUnique)
            }
          },
          {
            brand: newUpdatedBrand._id
          }
        ]
      })
      logger.info(`locationsWillRemove: ${locationsWillRemove.deletedCount}`)

      const locationPromises = locations.map(entity =>
        this._dbLocationRepository.insertOrUpdate(entity)
      )
      logger.info(`locations to save or update: ${locationPromises.length}`)

      await Promise.all(locationPromises)

      logger.info('Ended correctly')
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
}

module.exports = { BulkLocations }
