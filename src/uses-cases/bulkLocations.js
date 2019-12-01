'use strict'

const { BrandFactory, LocationFactory } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:BulkLocations'
)

class BulkLocations {
  constructor(
    brand,
    locations,
    bdBrandRepository,
    dbLocationRepository,
    md5Repository
  ) {
    this._brand = brand
    this._locations = locations
    this._bdBrandRepository = bdBrandRepository
    this._dbLocationRepository = dbLocationRepository
    this._md5Repository = md5Repository
  }

  async exec() {
    try {
      const brandFactory = new BrandFactory(
        {
          ...this._brand,
          computedUnique: this._md5Repository.exec(`${this._brand.name}`)
        },
        this._bdBrandRepository
      )
      const entity = await brandFactory.createEntity()
      const newUpdatedBrand = await this._bdBrandRepository.insertOrUpdate(
        entity
      )

      const locations = this._locations.map(item => {
        return {
          ...item,
          brand: newUpdatedBrand._id,
          computedUnique: this._md5Repository.exec(
            `${newUpdatedBrand._id}${item.name}${item.latitude}${item.longitude}`
          )
        }
      })

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

      const saveLocation = async item => {
        const locationFactory = new LocationFactory(
          {
            ...item
          },
          this._bdBrandRepository
        )
        const entityLocation = await locationFactory.createEntity()
        await this._dbLocationRepository.insertOrUpdate(entityLocation)
      }

      const locationPromises = locations.map(item => saveLocation(item))
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
