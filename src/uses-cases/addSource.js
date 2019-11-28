'use strict'

const { Source } = require('../entities')
const logger = require('../lib/logger')('collie:uses-cases:addSource')

const addSource = async ({ sources }) => {
  try {
    const saveSource = async item => {
      await new Source({
        ...item,
        insertTime: new Date()
      }).save()
    }

    const sourcePromises = sources.map(location => saveSource(location))
    logger.info(`sources to save: ${sourcePromises.length}`)

    await Promise.all(sourcePromises)

    logger.info('Ended correctly')
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

module.exports = { addSource }
