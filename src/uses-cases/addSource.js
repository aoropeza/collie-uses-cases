'use strict'

const { FactoryEntity } = require('../entities')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:addSource'
)

const addSource = async ({ sources, sourceRepository: dbStrategyInstance }) => {
  try {
    const saveSource = async item => {
      const entity = await FactoryEntity.createEntity(
        dbStrategyInstance,
        {
          ...item,
          insertTime: new Date()
        },
        'Source'
      )
      await dbStrategyInstance.save(entity)
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
