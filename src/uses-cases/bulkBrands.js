'use strict'

const crypto = require('crypto')

const { Brand, Location } = require('../entities')
const logger = require('../lib/logger')('collie:uses-cases:bulkBrands')

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

const bulkBrands = async ({ brands: brandsArg }) => {
  try {
    const brands = brandsArg.map(item => {
      return {
        ...item,
        computedUnique: crypto
          .createHash('md5')
          .update(`${item.name}`)
          .digest('hex')
      }
    })

    const idBrandsWillRemove = (
      await Brand.find({
        computedUnique: {
          $nin: brands.map(location => location.computedUnique)
        }
      })
    ).map(item => item._id)

    // Removing unused brands
    const brandsWillRemove = await Brand.remove({
      _id: idBrandsWillRemove
    })
    logger.info(`brandsWillRemove: ${brandsWillRemove.deletedCount}`)

    // Removing location ref to unused brands
    const locationsWithBrandWillRemove = await Location.remove({
      brand: idBrandsWillRemove
    })
    logger.info(
      `locationsWithBrandWillRemove: ${locationsWithBrandWillRemove.deletedCount}`
    )

    const saveBrand = async item => {
      await Brand.findOneAndUpdate(
        {
          name: item.name
        },
        {
          ...item
        },
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

module.exports = { bulkBrands }
