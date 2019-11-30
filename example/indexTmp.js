'use strict'

const { SourceFactory } = require('../src/entities')

const validator = {
  validate: (properties, schema, persistName) => {
    console.log('validando')
    return undefined
  }
}

const sourceFactory = new SourceFactory(validator, {
  ip: '127.0.0.1',
  computedUnique: 'asdasdas'
})

const entity = sourceFactory.buildEntity()

console.log('entity')
console.log(entity)
