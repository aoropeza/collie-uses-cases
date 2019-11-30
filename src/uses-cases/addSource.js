'use strict'

const { SourceFactory } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:AddSource'
)

class AddSource {
  constructor(sources, sourceRepository) {
    this._sources = sources
    this._sourceRepository = sourceRepository
  }

  async exec() {
    try {
      const saveSource = async item => {
        const sourceFactory = new SourceFactory(
          {
            ...item,
            insertTime: new Date()
          },
          this._sourceRepository
        )
        const entity = await sourceFactory.createEntity()
        await this._sourceRepository.save(entity)
      }

      const sourcePromises = this._sources.map(location => saveSource(location))
      logger.info(`sources to save: ${sourcePromises.length}`)

      await Promise.all(sourcePromises)

      logger.info('Ended correctly')
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
}

module.exports = { AddSource }
