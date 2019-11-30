'use strict'

const crypto = require('crypto')

const { Brand, Location } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:bulkLocations'
)

const insertOrUpdate = {
  setDefaultsOnInsert: true,
  upsert: true,
  new: true,
  runValidators: true
}

const bulkLocations = async ({ brand, locations: locationsArg }) => {
  try {
    const newUpdatedBrand = await Brand.findOneAndUpdate(
      { name: brand.name },
      brand,
      insertOrUpdate
    )

    const locations = locationsArg.map(item => {
      return {
        ...item,
        brand: newUpdatedBrand._id,
        computedUnique: crypto
          .createHash('md5')
          .update(
            `${newUpdatedBrand._id}${item.name}${item.latitude}${item.longitude}`
          )
          .digest('hex')
      }
    })

    const locationsWillRemove = await Location.remove({
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
      await Location.findOneAndUpdate(
        {
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude
        },
        {
          ...item
        },
        insertOrUpdate
      )
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

module.exports = { bulkLocations }
