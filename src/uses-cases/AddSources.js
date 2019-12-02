'use strict'

const { SourceFactory } = require('../entities/factories')
const logger = require('../frameworks-drivers/logger')(
  'collie:uses-cases:AddSource'
)

class AddSources {
  constructor(sources, dbSourceRepository) {
    this._sources = sources
    this._dbSourceRepository = dbSourceRepository
  }

  async exec() {
    try {
      const saveSource = async item => {
        const sourceFactory = new SourceFactory(
          {
            ...item
          },
          this._dbSourceRepository
        )
        const entity = await sourceFactory.createEntity()
        return this._dbSourceRepository.save(entity)
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

module.exports = { AddSources }
