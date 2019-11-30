'use strict'

const crypto = require('crypto')

const { BrandFactory, LocationFactory } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:BulkBrands'
)

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

class BulkBrands {
  constructor(brands, brandRepository, locationRepository) {
    this._brands = brands
    this._brandRepository = brandRepository
    this._locationRepository = locationRepository
  }

  async exec() {
    try {
      const brands = this._brands.map(item => {
        return {
          ...item,
          computedUnique: crypto
            .createHash('md5')
            .update(`${item.name}`)
            .digest('hex')
        }
      })

      const idBrandsWillRemove = (
        await this._brandRepository.find({
          computedUnique: {
            $nin: brands.map(item => item.computedUnique)
          }
        })
      ).map(item => item._id)

      // Removing unused brands
      const brandsWillRemove = await this._brandRepository.remove({
        _id: idBrandsWillRemove
      })
      logger.info(`brandsWillRemove: ${brandsWillRemove.deletedCount}`)

      // Removing location ref to unused brands
      const locationsWithBrandWillRemove = await this._locationRepository.remove(
        {
          brand: idBrandsWillRemove
        }
      )
      logger.info(
        `locationsWithBrandWillRemove: ${locationsWithBrandWillRemove.deletedCount}`
      )

      const saveBrand = async item => {
        const brandFactory = new BrandFactory(
          {
            ...item
          },
          this._brandRepository
        )
        const entity = await brandFactory.createEntity()
        await this._brandRepository.findOneAndUpdate(
          {
            name: item.name
          },
          entity,
          insertOrUpdate
        )
      }

      const brandPromises = brands.map(item => saveBrand(item))
      logger.info(`brands to save or update: ${brandPromises.length}`)

      await Promise.all(brandPromises)

      logger.info('Ended correctly')
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
}

module.exports = { BulkBrands }
