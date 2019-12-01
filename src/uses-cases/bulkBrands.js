'use strict'

const { BrandFactory } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:BulkBrands'
)

class BulkBrands {
  constructor(brands, dbBrandRepository, dbLocationRepository, md5Repository) {
    this._brands = brands
    this._dbBrandRepository = dbBrandRepository
    this._dbLocationRepository = dbLocationRepository
    this._md5Repository = md5Repository
  }

  async exec() {
    try {
      const brands = this._brands.map(item => {
        return {
          ...item,
          computedUnique: this._md5Repository.exec(`${item.name}`)
        }
      })

      const idBrandsWillRemove = (
        await this._dbBrandRepository.find({
          computedUnique: {
            $nin: brands.map(item => item.computedUnique)
          }
        })
      ).map(item => item._id)

      // Removing unused brands
      const brandsWillRemove = await this._dbBrandRepository.remove({
        _id: idBrandsWillRemove
      })
      logger.info(`brandsWillRemove: ${brandsWillRemove.deletedCount}`)

      // Removing location ref to unused brands
      const locationsWithBrandWillRemove = await this._dbLocationRepository.remove(
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
          this._dbBrandRepository
        )
        const entity = await brandFactory.createEntity()
        await this._dbBrandRepository.insertOrUpdate(entity)
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
