'use strict'

const { Brand, Location } = require('../entities')
const logger = require('../lib/logger')(
  'collie:uses-cases:bulkBrandWithLocations'
)

const optionsFindOneOrUpdate = {
  upsert: true,
  new: true,
  runValidators: true
}

const bulkLocations = async ({ brand, locations }) => {
  try {
    const newUpdatedBrand = await Brand.findOneAndUpdate(
      { name: brand.name },
      brand,
      optionsFindOneOrUpdate
    )

    const itemsWillRemove = await Location.remove({
      $or: [
        { latitude: { $nin: locations.map(location => location.latitude) } },
        { longitudes: { $nin: locations.map(location => location.longitude) } }
      ]
    })
    logger.info(`itemsWillRemove: ${itemsWillRemove.deletedCount}`)

    const saveLocation = async newLocation => {
      await Location.findOneAndUpdate(
        { latitude: newLocation.latitude, longitude: newLocation.longitude },
        { ...newLocation, brand: newUpdatedBrand._id },
        optionsFindOneOrUpdate
      )
    }

    const locationPromises = locations.map(location => saveLocation(location))

    await Promise.all(locationPromises)

    logger.info('bulkBrandWithLocations ended correctly')
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

module.exports = { bulkLocations }
